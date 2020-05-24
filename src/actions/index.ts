import { Ethnicity, Location } from "../interfaces"
import { AllOutcomeResponse } from "../interfaces/index"

export enum ActionType {
    initLocations,
    initEthnicities,
    initOutcomes,
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

interface InitOutcomesAction {
    type: ActionType.initOutcomes
    payload: AllOutcomeResponse[]
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
    | InitOutcomesAction
    | SelectEthnicityAction
    | SelectLocationAction
    | UpdateAgeAction
    | UpdateHourOfDayAction
    | UpdateIsPedestrianStop
