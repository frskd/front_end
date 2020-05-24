import React, { useReducer, useEffect } from "react"

import AppContext, { initialAppState } from "./store"
import { ActionType } from "./actions"
import { fetchLocations, fetchEthnicities, fetchOutcomes } from "./api/index"
import { appReducer } from "./reducers"
import UsMap from "./components/us-map"
import OutcomesView from "./components/outcomes-view"

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

    useEffect(() => {
        ;(async () => {
            const outcomes = await fetchOutcomes()
            dispatch({
                type: ActionType.initOutcomes,
                payload: outcomes
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
            <OutcomesView />
            <UsMap />
        </AppContext.Provider>
    )
}

export default App
