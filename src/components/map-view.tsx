import React, { useContext } from "react"
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/core"
import { css } from "@emotion/core"

import { outcomeTypes } from "../interfaces"
import { capitalize } from "../utils"
import UsMap from "./us-map"
import AppContext from "../store"
import { ActionType } from "../actions"

const MapView = () => {
    const { dispatch } = useContext(AppContext)
    return (
        <Tabs
            css={css`
                width: 50%;
            `}
            onChange={(index: number) => {
                dispatch({
                    type: ActionType.settingsUpdateOutcomeType,
                    payload: outcomeTypes[index]
                })
            }}
        >
            <TabList>
                {outcomeTypes.map((type) => {
                    const label = capitalize(type.toString())
                    return <Tab key={type}>{label}</Tab>
                })}
            </TabList>
            <TabPanels>
                {outcomeTypes.map((type) => {
                    return (
                        <TabPanel key={type}>
                            <UsMap type={type} />
                        </TabPanel>
                    )
                })}
            </TabPanels>
        </Tabs>
    )
}

export default MapView
