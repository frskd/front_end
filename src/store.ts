import { createContext, Dispatch } from "react"

import { AppState } from "./interfaces"
import { Action } from "./actions"
import { OutcomeType } from "./interfaces/index"

export const initialAppState: AppState = {
    locations: {},
    ethnicities: {},
    outcomes: {},
    settings: {
        locationId: "Wa",
        ethnicityId: "african_american",
        age: 27,
        hourOfTheDay: 12,
        isPedestrianStop: false,
        outcomeType: OutcomeType.arrest
    }
}

const AppContext = createContext<{
    state: AppState
    dispatch: Dispatch<Action>
}>({ state: initialAppState, dispatch: () => {} })

export default AppContext
