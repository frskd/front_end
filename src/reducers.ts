import { ActionType, Action } from "./actions"
import { AppState } from "./interfaces"
import { Outcome } from "./interfaces/index"

export const appReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case ActionType.initLocations:
            return {
                ...state,
                locations: action.payload.reduce((prev, current) => {
                    return Object.assign(prev, { [current.id]: { ...current } })
                }, {})
            }
        case ActionType.initEthnicities:
            return {
                ...state,
                ethnicities: action.payload.reduce((prev, current) => {
                    return Object.assign(prev, { [current.id]: { ...current } })
                }, {})
            }
        case ActionType.initOutcomes:
            return {
                ...state,
                outcomes: action.payload.reduce<{
                    [locationId: string]: Outcome
                }>((prev, current) => {
                    const location = current.location
                    delete current.location
                    return Object.assign(prev, {
                        [location]: { ...current }
                    })
                }, {})
            }
        case ActionType.settingsSelectLocation:
            return {
                ...state,
                settings: { ...state.settings, locationId: action.payload }
            }
        case ActionType.settingsSelectEthnicity:
            return {
                ...state,
                settings: { ...state.settings, ethnicityId: action.payload }
            }
        case ActionType.settingsUpdateAge:
            return {
                ...state,
                settings: { ...state.settings, age: action.payload }
            }
        case ActionType.settingsUpdateHourOfTheDay:
            return {
                ...state,
                settings: { ...state.settings, hourOfTheDay: action.payload }
            }
        case ActionType.settingsUpdateIsPedestrianStop:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    isPedestrianStop: action.payload
                }
            }
        default:
            return state
    }
}
