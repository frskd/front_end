import React, { useContext } from "react"
import {
    Box,
    Heading,
    Stat,
    StatNumber,
    Badge,
    StatGroup,
    Flex
} from "@chakra-ui/core"

import AppContext from "../store"
import { OutcomeType } from "../interfaces"
import { capitalize, decimalToPercent } from "../utils"
import { outcomeForLocationId } from "../selectors"

const types = [OutcomeType.arrest, OutcomeType.citation, OutcomeType.none]

const OutcomesView = () => {
    const { state } = useContext(AppContext)

    return (
        <Box
            p={5}
            shadow="md"
            borderWidth="1px"
            flex="1"
            rounded="md"
            maxWidth="20%"
        >
            <Heading size="md">Outcomes</Heading>
            <StatGroup direction="column">
                {types.map((type) => {
                    const outcome = outcomeForLocationId(state, type)
                    const percent = decimalToPercent(outcome)
                    const label = capitalize(type.toString())
                    return (
                        <Stat key={type}>
                            <Flex justifyContent="space-between" align="center">
                                <StatNumber>{percent}</StatNumber>
                                <Badge>{label}</Badge>
                            </Flex>
                        </Stat>
                    )
                })}
            </StatGroup>
        </Box>
    )
}

export default OutcomesView
