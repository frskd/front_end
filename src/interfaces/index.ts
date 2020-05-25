export enum OutcomeType {
    arrest = "arrest",
    citation = "citation",
    none = "none"
}

export const outcomeTypes = [
    OutcomeType.arrest,
    OutcomeType.citation,
    OutcomeType.none
]

export type Outcome = Record<OutcomeType, number>

export interface AllOutcomeResponse extends Outcome {
    location: string
}

export interface OutcomeQuery {
    hour_of_day: number
    age: number
    is_pedestrian_stop: boolean
    ethnicity: string
}

interface BaseResource {
    id: string
    name: string
}

export interface Location extends BaseResource {}
export interface Ethnicity extends BaseResource {}

export interface AppState {
    locations: { [locationId: string]: Location }
    ethnicities: { [ethnicityId: string]: Ethnicity }
    outcomes: { [locationId: string]: Outcome }
    settings: {
        locationId: string
        ethnicityId: string
        age: number
        hourOfTheDay: number
        isPedestrianStop: boolean
        outcomeType: OutcomeType | null
    }
}
