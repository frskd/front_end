import React, { useEffect, useState } from "react"
import uuid from "uuid"

import { OutcomesInputData } from "../types/index"

interface InputControlsProps {
    locations: Array<{ id: string; name: string }>
    ethnicities: Array<{ id: string; name: string }>
    controlsDidChange: (
        selectedUsState: string,
        inputData: OutcomesInputData
    ) => void
}

const InputControls: React.FC<InputControlsProps> = ({
    locations,
    ethnicities,
    controlsDidChange
}) => {
    const [inputData, setInputData] = useState({
        usState: "washington",
        ethnicity: "black",
        hourOfDay: 12,
        age: 18,
        isPedestrianStop: false
    })

    const handleStringChange = (
        event: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>
    ) => {
        const { name, value } = event.currentTarget
        setInputData({
            ...inputData,
            [name]: value
        })
    }

    const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget
        setInputData({
            ...inputData,
            [name]: Number(value)
        })
    }

    useEffect(() => {
        controlsDidChange(inputData.usState, {
            ethnicity: inputData.ethnicity,
            hour_of_day: inputData.hourOfDay,
            age: inputData.age,
            is_pedestrian_stop: inputData.isPedestrianStop
        })
    }, [inputData, controlsDidChange])

    return (
        <form>
            <select
                name="usState"
                value={inputData.usState}
                onChange={handleStringChange}
            >
                {locations.map(({ id, name }) => (
                    <option key={uuid()} value={name}>
                        {name}
                    </option>
                ))}
            </select>
            <select
                name="ethnicity"
                value={inputData.ethnicity}
                onChange={handleStringChange}
            >
                {ethnicities.map(({ id, name }) => (
                    <option key={uuid()} value={name}>
                        {id}
                    </option>
                ))}
            </select>
            <label htmlFor="hourOfDay">
                Hour of the Day
                <input
                    id="hourOfDay"
                    name="hourOfDay"
                    type="range"
                    min={0}
                    max={23}
                    step={1}
                    defaultValue={inputData.hourOfDay}
                    onChange={handleNumberChange}
                />
            </label>
            <label htmlFor="age">
                Age
                <input
                    id="age"
                    name="age"
                    type="range"
                    min={10}
                    max={110}
                    step={1}
                    defaultValue={inputData.age}
                    onChange={handleNumberChange}
                />
            </label>
            <label htmlFor="pedestrian">Pedestrian Stop</label>
            <input
                id="pedestrian"
                type="radio"
                name="typeOfStop"
                defaultChecked={inputData.isPedestrianStop}
                onChange={() =>
                    setInputData({ ...inputData, isPedestrianStop: true })
                }
            />
            <label htmlFor="vehicular">Vehicular Stop</label>
            <input
                id="vehicular"
                type="radio"
                name="typeOfStop"
                defaultChecked={!inputData.isPedestrianStop}
                onChange={() =>
                    setInputData({ ...inputData, isPedestrianStop: false })
                }
            />
        </form>
    )
}

export default InputControls
