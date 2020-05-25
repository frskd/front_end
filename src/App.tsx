import React, { useReducer, useEffect } from "react"
import { ThemeProvider, CSSReset } from "@chakra-ui/core"

import AppContext, { initialAppState } from "./store"
import { ActionType } from "./actions"
import { fetchLocations, fetchEthnicities, fetchOutcomes } from "./api/index"
import { appReducer } from "./reducers"
import OutcomesView from "./components/outcomes-view"
import customTheme from "./theme"
import SettingsView from "./components/settings-view"
import Layout from "./components/layout"
import MapView from "./components/map-view"

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
            <ThemeProvider theme={customTheme}>
                <CSSReset />
                <Layout>
                    <OutcomesView />
                    <MapView />
                    <SettingsView />
                </Layout>
            </ThemeProvider>
        </AppContext.Provider>
    )
}

export default App
