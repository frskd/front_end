import { Ethnicity, Location } from "../interfaces"

export enum ActionType {
    initLocations,
    initEthnicities,
    settingsSelectLocation,
    settingsSelectEthnicity,
    settingsUpdateAge,
    settingsUpdateHourOfTheDay,
    settingsUpdateIsPedestrianStop
}

interface InitLocationsAction {
    type: ActionType.initLocations
    payload: Location[]
}

interface InitEthnicitiesAction {
    type: ActionType.initEthnicities
    payload: Ethnicity[]
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

export type Action =
    | InitLocationsAction
    | InitEthnicitiesAction
    | SelectEthnicityAction
    | SelectLocationAction
    | UpdateAgeAction
    | UpdateHourOfDayAction
    | UpdateIsPedestrianStop
