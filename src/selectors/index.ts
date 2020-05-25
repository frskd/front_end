import { AppState, OutcomeType, Location } from "../interfaces"

export const outcomeForLocationId = (
    state: AppState,
    type: OutcomeType
): number => {
    const locationId = state.settings.locationId
    const location = state.locations[locationId]

    if (!location) return 0
    const outcome = state.outcomes[location.name]

    if (!outcome) return 0

    return outcome[type]
}

export const idForLocationName = (
    locations: { [key: string]: Location },
    stateName: string
) => {
    for (const locationId in locations) {
        const location = locations[locationId]
        if (stateName === location.name) {
            return location.id
        }
    }
}

export const domainForOutcomes = (
    outcomes: {
        [locationId: string]: Record<OutcomeType, number>
    },
    type: OutcomeType
) => {
    let min = Infinity
    let max = -Infinity

    for (const locationId in outcomes) {
        const currentOutcome = outcomes[locationId]

        if (currentOutcome[type] < min) {
            min = currentOutcome[type]
        }

        if (currentOutcome[type] > max) {
            max = currentOutcome[type]
        }
    }

    return [min, max]
}
