import axios from "axios"

import { OutcomesData, OutcomesInputData } from "../types"

export const fetchLocations = async () => {
    const { data } = await axios.get("http://localhost:5000/locations")
    return data
}

export const fetchEthnicities = async () => {
    const { data } = await axios.get("http://localhost:5000/ethnicities")
    return data
}

export const fetchOutcomes = async (
    location: string,
    inputData: OutcomesInputData
): Promise<OutcomesData> => {
    const { data } = await axios.get(
        `http://localhost:5000/outcomes/${location}`,
        {
            params: { ...inputData }
        }
    )
    return data
}
