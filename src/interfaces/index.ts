export interface Outcome {
    arrest: number
    citation: number
    none: number
}

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
    }
}
