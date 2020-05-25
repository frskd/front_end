import {
    Ethnicity,
    Location,
    AllOutcomeResponse,
    OutcomeType,
    Outcome
} from "../interfaces"

export enum ActionType {
    initLocations,
    initEthnicities,
    initOutcomes,
    updateOutcome,
    settingsSelectLocation,
    settingsSelectEthnicity,
    settingsUpdateAge,
    settingsUpdateHourOfTheDay,
    settingsUpdateIsPedestrianStop,
    settingsUpdateOutcomeType
}

interface InitLocationsAction {
    type: ActionType.initLocations
    payload: Location[]
}

interface InitEthnicitiesAction {
    type: ActionType.initEthnicities
    payload: Ethnicity[]
}

interface InitOutcomesAction {
    type: ActionType.initOutcomes
    payload: AllOutcomeResponse[]
}

interface UpdateOutcomeAction {
    type: ActionType.updateOutcome
    payload: Outcome & { locationId: string }
}

interface SelectLocationAction {
    type: ActionType.settingsSelectLocation
    payload: string
}

interface SelectEthnicityAction {
    type: ActionType.settingsSelectEthnicity
    payload: string
}
interface UpdateAgeAction {
    type: ActionType.settingsUpdateAge
    payload: number
}

interface UpdateHourOfDayAction {
    type: ActionType.settingsUpdateHourOfTheDay
    payload: number
}

interface UpdateIsPedestrianStop {
    type: ActionType.settingsUpdateIsPedestrianStop
    payload: boolean
}

interface UpdateOutcomeTypeAction {
    type: ActionType.settingsUpdateOutcomeType
    payload: OutcomeType | null
}

export type Action =
    | InitLocationsAction
    | InitEthnicitiesAction
    | InitOutcomesAction
    | SelectEthnicityAction
    | SelectLocationAction
    | UpdateAgeAction
    | UpdateHourOfDayAction
    | UpdateIsPedestrianStop
    | UpdateOutcomeTypeAction
    | UpdateOutcomeAction
