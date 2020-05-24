import React, { useContext, useEffect, useCallback } from "react"

import AppContext from "../store"
import { AppState, Outcome } from "../interfaces"
import { ActionType } from "../actions"
import { OutcomeType } from "../interfaces/index"

const outcomeForLocationId = (state: AppState): number | Outcome => {
    const locationId = state.settings.locationId
    const type = state.settings.outcomeType
    const location = state.locations[locationId]

    if (!location) return 0
    const outcome = state.outcomes[location.name]

    if (!outcome) return 0

    if (!type) return { ...outcome }

    return outcome[type]
}

const types = [OutcomeType.arrest, OutcomeType.citation, OutcomeType.none, null]

const OutcomesView = () => {
    const { state, dispatch } = useContext(AppContext)
    // const [type, setType] = useState<OutcomeType | null>(null)

    const selectRandomOutcomeType = useCallback(
        function selectRandomOutcomeType() {
            const randomIndex = Math.floor(Math.random() * types.length)
            const type = types[randomIndex]
            dispatch({
                type: ActionType.settingsUpdateOutcomeType,
                payload: type
            })
        },
        []
    )
    useEffect(() => {
        const cancelId = setInterval(selectRandomOutcomeType, 3000)

        return () => clearInterval(cancelId)
    }, [state.settings.outcomeType])

    return (
        <aside>
            <h2>Outcomes</h2>
            <ul>
                <li>
                    <h3>
                        {JSON.stringify(
                            state.settings.outcomeType || "All Outcome Types"
                        )}
                    </h3>
                    <pre>
                        {JSON.stringify(outcomeForLocationId(state), null, 2)}
                    </pre>
                </li>
            </ul>
        </aside>
    )
}

export default OutcomesView
