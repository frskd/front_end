import axios from "axios"

import { Location, Ethnicity, Outcome, OutcomeQuery } from "../interfaces"
import { AllOutcomeResponse } from "../interfaces/index"

const { REACT_APP_FLASK_API_BASE_URL } = process.env

const axiosInstance = axios.create({
    baseURL: REACT_APP_FLASK_API_BASE_URL
})

export const fetchLocations = async (): Promise<Location[]> => {
    const { data } = await axiosInstance.get("/locations")
    return data
}

export const fetchEthnicities = async (): Promise<Ethnicity[]> => {
    const { data } = await axiosInstance.get("/ethnicities")
    return data
}

export const fetchOutcomes = async () => {
    const { data: outcomes } = await axiosInstance.get<AllOutcomeResponse[]>(
        "/outcomes?ethnicity=black&age=18&hour_of_day=12&is_pedestrian_stop=false"
    )
    return outcomes
}

export const fetchOutcomesByLocation = async (
    location: string,
    query: OutcomeQuery
): Promise<Outcome> => {
    const { data } = await axiosInstance.get(`/outcomes/${location}`, {
        params: { ...query }
    })
    return data
}
