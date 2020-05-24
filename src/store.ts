import { createContext, Dispatch } from "react"

import { AppState } from "./interfaces"
import { Action } from "./actions"

export const initialAppState: AppState = {
    locations: {},
    ethnicities: {},
    outcomes: {},
    settings: {
        locationId: "Wa",
        ethnicityId: "<insert-uuid>",
        age: 18,
        hourOfTheDay: 12,
        isPedestrianStop: false
    }
}

const AppContext = createContext<{
    state: AppState
    dispatch: Dispatch<Action>
}>({ state: initialAppState, dispatch: () => {} })

export default AppContext
