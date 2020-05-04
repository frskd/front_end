import React from "react"

const SelectStopType = ({ isPedestrianStop = false }) => {
    return (
        <div>
            <label htmlFor="pedestrian">Pedestrian Stop</label>
            <input
                id="pedestrian"
                type="radio"
                name="typeOfStop"
                defaultChecked={isPedestrianStop}
                onChange={() => {}}
            />
            <label htmlFor="vehicular">Vehicular Stop</label>
            <input
                id="vehicular"
                type="radio"
                name="typeOfStop"
                defaultChecked={!isPedestrianStop}
                onChange={() => {}}
            />
        </div>
    )
}

export default SelectStopType
