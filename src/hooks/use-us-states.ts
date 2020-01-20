import { useEffect } from "react"
import createPersistedStore from "use-persisted-state"

import { fetchLocations } from "../api"

const useUsStatesStore = createPersistedStore("usStates")

const useUsStates = () => {
    const [usStates, setUsStates] = useUsStatesStore([])

    useEffect(() => {
        if (usStates.length > 0) {
            return
        }

        fetchLocations()
            .then(locations => setUsStates(locations))
            .catch(console.error)
    }, [usStates, setUsStates])

    return usStates
}

export default useUsStates
