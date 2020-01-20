import React, { useCallback, useState } from "react"
import uuid from "uuid/v4"

import { fetchOutcomes } from "./api"
import InputControls from "./components/InputControls"
import { OutcomesData } from "./types"
import { OutcomesInputData } from "./types/index"

const App: React.FC = () => {
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

    return (
        <>
            <h1>Frskd</h1>

            <ul style={{ display: "flex", justifyContent: "space-around" }}>
                {Object.values(outcomesData).map((outcomeData, i) => (
                    <li key={uuid()}>
                        <h4>{Object.keys(outcomesData)[i]}</h4>
                        <p>{(outcomeData * 100).toPrecision(2)}%</p>
                        <progress value={outcomeData} />
                    </li>
                ))}
            </ul>

            <InputControls controlsDidChange={handleChange} />
        </>
    )
}

export default App
