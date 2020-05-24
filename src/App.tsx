import React, { useReducer, useEffect } from "react"

import AppContext, { initialAppState } from "./store"
import { ActionType } from "./actions"
import { fetchLocations, fetchEthnicities } from "./api/index"
import { appReducer } from "./reducers"

const App: React.FC = () => {
    const [state, dispatch] = useReducer(appReducer, initialAppState)

    useEffect(() => {
        ;(async () => {
            const locations = await fetchLocations()
            dispatch({
                type: ActionType.initLocations,
                payload: locations
            })
        })()
    }, [])

    useEffect(() => {
        ;(async () => {
            const ethnicities = await fetchEthnicities()
            dispatch({
                type: ActionType.initEthnicities,
                payload: ethnicities
            })
        })()
    }, [])

    return (
        <AppContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            <h1>Frskd</h1>
            {JSON.stringify(state, null, 2)}
        </AppContext.Provider>
    )
}

export default App
