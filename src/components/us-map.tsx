import React, { useContext } from "react"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { scaleLinear } from "d3-scale"

import AppContext from "../store"
import { ActionType } from "../actions"
import { snakeCase } from "../utils"
import { idForLocationName } from "../selectors"
import { OutcomeType } from "../interfaces"
import { domainForOutcomes } from "../selectors/index"

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"

interface UsMapProps {
    type: OutcomeType
}

const UsMap: React.FC<UsMapProps> = ({ type }) => {
    const { state, dispatch } = useContext(AppContext)

    return (
        <ComposableMap projection="geoAlbersUsa">
            <Geographies geography={geoUrl}>
                {({ geographies }) =>
                    geographies.map((geo) => {
                        const currentStateName = geo.properties.name
                        const currentLocationName = snakeCase(currentStateName)
                        let currentOutcome = state.outcomes[currentLocationName]

                        return (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                onMouseEnter={() => {
                                    const locationId = idForLocationName(
                                        state.locations,
                                        currentLocationName
                                    )
                                    if (locationId) {
                                        dispatch({
                                            type:
                                                ActionType.settingsSelectLocation,
                                            payload: locationId
                                        })
                                    }
                                }}
                                fill={
                                    currentOutcome
                                        ? scaleLinear<string, string>()
                                              .domain(
                                                  domainForOutcomes(
                                                      state.outcomes,
                                                      type
                                                  )
                                              )
                                              .range(["#F687B3", "#702459"])(
                                              currentOutcome[type]
                                          )
                                        : "#00000006"
                                }
                            />
                        )
                    })
                }
            </Geographies>
        </ComposableMap>
    )
}

export default UsMap
