import React, { useCallback, useEffect, useState } from "react"
import uuid from "uuid/v4"

import { fetchEthnicities, fetchLocations, fetchOutcomes } from "./api"
import InputControls from "./components/InputControls"
import { OutcomesData } from "./types"
import { OutcomesInputData } from "./types/index"

const App: React.FC = () => {
    const [locations, setLocations] = useState([])
    const [ethnicities, setEthnicities] = useState([])

    const [outcomesData, setOutcomesData] = useState<OutcomesData>({
        arrest: 0,
        citation: 0,
        none: 0
    })

    const handleChange = useCallback(
        (selectedUsState: string, inputData: OutcomesInputData) => {
            fetchOutcomes(selectedUsState, inputData)
                .then(data => setOutcomesData(data))
                .catch(console.error)
        },
        []
    )
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

    return (
        <>
            <h1>Frskd</h1>
            <InputControls
                locations={locations}
                ethnicities={ethnicities}
                controlsDidChange={handleChange}
            />
            <section
                style={{ display: "flex", justifyContent: "space-around" }}
            >
                <h2>Results</h2>

                <main>
                    <h3>Outcomes</h3>
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
