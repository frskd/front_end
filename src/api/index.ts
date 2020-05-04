import axios from "axios"

import { OutcomesData, OutcomesInputData } from "../types"

const { REACT_APP_FLASK_API_BASE_URL } = process.env

const axiosInstance = axios.create({
    baseURL: REACT_APP_FLASK_API_BASE_URL
})

export interface UsaState {
    id: string
    name: string
}

export interface Ethnicity {
    id: string
    name: string
}
export const fetchLocations = async (): Promise<UsaState[]> => {
    const { data } = await axiosInstance.get("/locations")
    return data
}

export const fetchEthnicities = async () => {
    const { data } = await axiosInstance.get("/ethnicities")
    return data
}

export const fetchOutcomes = async (
    location: string,
    inputData: OutcomesInputData
): Promise<OutcomesData> => {
    const { data } = await axiosInstance.get(`/outcomes/${location}`, {
        params: { ...inputData }
    })
    return data
}
