import React, { useContext } from "react"
import { Stack, FormLabel, Flex, Switch, Box, Select } from "@chakra-ui/core"
import {
    Heading,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb
} from "@chakra-ui/core"

import AppContext from "../store"
import { ActionType } from "../actions"
import { capitalize } from "../utils"

const SettingsView = () => {
    const { state, dispatch } = useContext(AppContext)

    return (
        <Box
            p={5}
            shadow="md"
            borderWidth="1px"
            flex="1"
            rounded="md"
            maxWidth="20%"
        >
            <Stack>
                <Heading size="md">
                    {capitalize(
                        state.locations[state.settings.locationId]?.name ||
                            "Loading..."
                    )}
                </Heading>
                <div>
                    <FormLabel>Hour of the Day</FormLabel>
                    <Slider
                        min={0}
                        max={23}
                        value={state.settings.hourOfTheDay}
                        onChange={(value: number) => {
                            dispatch({
                                type: ActionType.settingsUpdateHourOfTheDay,
                                payload: value
                            })
                        }}
                    >
                        <SliderTrack bg="red.100" />
                        <SliderFilledTrack bg="tomato" />
                        <SliderThumb size={6} />
                    </Slider>
                </div>

                <div>
                    <FormLabel>Age</FormLabel>
                    <Slider
                        min={18}
                        max={80}
                        value={state.settings.age}
                        onChange={(value: number) => {
                            dispatch({
                                type: ActionType.settingsUpdateAge,
                                payload: value
                            })
                        }}
                    >
                        <SliderTrack bg="red.100" />
                        <SliderFilledTrack bg="tomato" />
                        <SliderThumb size={6} />
                    </Slider>
                </div>
                <div>
                    <FormLabel htmlFor="isPedestrianStop">
                        Select Ethnicity
                    </FormLabel>
                    <Select
                        value={state.settings.ethnicityId}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            dispatch({
                                type: ActionType.settingsSelectEthnicity,
                                payload: e.currentTarget.value
                            })
                        }}
                    >
                        {Object.values(state.ethnicities).map((ethnicity) => {
                            return (
                                <option key={ethnicity.id} value={ethnicity.id}>
                                    {ethnicity.name}
                                </option>
                            )
                        })}
                    </Select>
                </div>
                <Flex justify="center" align="center">
                    <FormLabel htmlFor="isPedestrianStop">
                        Show Pedestrian Stops?
                    </FormLabel>
                    <Switch
                        id="isPedestrianStop"
                        value={state.settings.isPedestrianStop}
                        onChange={() => {
                            dispatch({
                                type: ActionType.settingsUpdateIsPedestrianStop,
                                payload: !state.settings.isPedestrianStop
                            })
                        }}
                    />
                </Flex>
            </Stack>
        </Box>
    )
}

export default SettingsView
