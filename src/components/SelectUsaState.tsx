import React from "react"
import useUsStates from "../hooks/use-us-states"

const SelectUsaState = () => {
    const usStates = useUsStates()

    return (
        <>
            <h2>Select a State</h2>
            <ul>
                {usStates.map(usState => (
                    <li key={usState.id}>{usState.name}</li>
                ))}
            </ul>
        </>
    )
}

export default SelectUsaState
