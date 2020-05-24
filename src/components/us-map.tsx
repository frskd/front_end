import React, { useContext, useEffect, useState } from "react"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { css } from "@emotion/core"
import { scaleLinear } from "d3-scale"

import { Location } from "../interfaces"
import AppContext from "../store"
import { ActionType } from "../actions/index"

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"

const snakeCase = (name: string) => {
    return name
        .split(" ")
        .map((s) => s.toLowerCase())
        .join("_")
}

const idForLocationName = (
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

const UsMap = () => {
    const [domain, setDomain] = useState([0, 1])
    const { state, dispatch } = useContext(AppContext)
    const colorScale = scaleLinear<string, string>()
        .domain(domain)
        .range(["#F687B3", "#702459"])

    useEffect(() => {
        let min = Infinity
        let max = -Infinity

        for (const locationId in state.outcomes) {
            const currentOutcome = state.outcomes[locationId]

            if (currentOutcome.arrest < min) {
                min = currentOutcome.arrest
            }

            if (currentOutcome.arrest > max) {
                max = currentOutcome.arrest
            }
        }

        setDomain([min, max])
    }, [state.outcomes])

    return (
        <div
            css={css`
                max-width: calc(100vw - 50%);
                margin: auto;

                svg {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            `}
        >
            <ComposableMap projection="geoAlbersUsa">
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map((geo) => {
                            const currentStateName = geo.properties.name
                            const currentLocationName = snakeCase(
                                currentStateName
                            )
                            let currentOutcome =
                                state.outcomes[currentLocationName]

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
                                            ? colorScale(currentOutcome.arrest)
                                            : "#00000006"
                                    }
                                />
                            )
                        })
                    }
                </Geographies>
            </ComposableMap>
        </div>
    )
}

export default UsMap
