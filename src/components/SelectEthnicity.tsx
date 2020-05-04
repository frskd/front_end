import React from "react"
import useEthnicities from "../hooks/use-ethnicities"

const SelectEthnicity = () => {
    const ethnicities = useEthnicities()

    return (
        <>
            <h2>Select Ethnicity</h2>
            <ul>
                {ethnicities.map(ethnicity => (
                    <li key={ethnicity.id}>{ethnicity.name}</li>
                ))}
            </ul>
        </>
    )
}

export default SelectEthnicity
