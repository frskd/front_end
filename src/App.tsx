import React, { useEffect, useState } from "react"
import uuid from "uuid/v4"

import { fetchEthnicities, fetchLocations, fetchOutcomes } from "./api"
import { OutcomesData } from "./types"

const App: React.FC = () => {
    const [locations, setLocations] = useState([])
    const [ethnicities, setEthnicities] = useState([])

    const [selectedLocation, setSelectedLocation] = useState("washington")
    const [selectedEthnicity, setSelectedEthnicity] = useState("black")
    const [selectedHourOfTheDay, setSelectedHourOfTheDay] = useState(12)
    const [selectedAge, setSelectedAge] = useState(18)
    const [isPedestrianStop, setIsPedestrianStop] = useState(false)

    const [outcomesData, setOutcomesData] = useState<OutcomesData>({
        arrest: 0,
        citation: 0,
        none: 0
    })
    useEffect(() => {
        fetchLocations()
            .then(loc => {
                setLocations(loc)
            })
            .catch(console.error)
    }, [])
    useEffect(() => {
        fetchEthnicities()
            .then(ethnics => {
                setEthnicities(ethnics)
            })
            .catch(console.error)
    }, [])

    useEffect(() => {
        fetchOutcomes(selectedLocation, {
            age: selectedAge,
            ethnicity: selectedEthnicity,
            hour_of_day: selectedHourOfTheDay,
            is_pedestrian_stop: isPedestrianStop
        })
            .then(data => setOutcomesData(data))
            .catch(console.error)
    }, [
        selectedLocation,
        selectedEthnicity,
        selectedHourOfTheDay,
        selectedAge,
        isPedestrianStop
    ])

    return (
        <>
            <h1>Frskd</h1>
            <select
                name="locations"
                value={selectedLocation}
                onChange={e => setSelectedLocation(e.currentTarget.value)}
            >
                {locations.map(({ id, name }) => (
                    <option key={uuid()} value={name}>
                        {name}
                    </option>
                ))}
            </select>
            <select
                name="ethnicities"
                value={selectedEthnicity}
                onChange={e => setSelectedEthnicity(e.currentTarget.value)}
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
                    type="range"
                    name="hour_of_day"
                    id="hourOfDay"
                    min={0}
                    max={23}
                    step={1}
                    defaultValue={selectedHourOfTheDay}
                    onChange={e =>
                        setSelectedHourOfTheDay(Number(e.currentTarget.value))
                    }
                />
            </label>
            <label htmlFor="age">
                Age
                <input
                    type="range"
                    name="age"
                    id="age"
                    min={10}
                    max={110}
                    step={1}
                    defaultValue={selectedAge}
                    onChange={e =>
                        setSelectedAge(Number(e.currentTarget.value))
                    }
                />
            </label>
            <label htmlFor="pedestrian">Pedestrian Stop</label>
            <input
                type="radio"
                name="typeOfStop"
                id="pedestrian"
                defaultChecked={isPedestrianStop}
                onChange={e => setIsPedestrianStop(true)}
            />
            <label htmlFor="vehicular">Vehicular Stop</label>
            <input
                type="radio"
                name="typeOfStop"
                id="vehicular"
                defaultChecked={!isPedestrianStop}
                onChange={e => setIsPedestrianStop(false)}
            />

            <section
                style={{ display: "flex", justifyContent: "space-around" }}
            >
                <h2>Results</h2>
                <aside>
                    <h3>Provided Input</h3>
                    <p>{selectedLocation}</p>
                    <p>{selectedEthnicity}</p>
                    <p>{selectedHourOfTheDay}th hour of the day</p>
                    <p>{selectedAge} years old</p>
                    <p>{isPedestrianStop ? "Pedestrian" : "Vehicular"} stop</p>
                </aside>
                <main>
                    <h3>Outcome for {selectedLocation}</h3>
                    <ul>
                        {Object.values(outcomesData).map((outcomeData, i) => (
                            <li key={uuid()}>
                                <h4>{Object.keys(outcomesData)[i]}</h4>
                                <p>{(outcomeData * 100).toPrecision(2)}%</p>
                                <progress value={outcomeData} />
                            </li>
                        ))}
                    </ul>
                </main>
            </section>
        </>
    )
}

export default App
