import { useEffect } from "react"
import createPersistedStore from "use-persisted-state"

import { fetchEthnicities } from "../api"
import { Ethnicity } from "../interfaces"

const useEthnicitiesStore = createPersistedStore("ethnicities")

const useEthnicities = () => {
    const [ethnicities, setEthnicities] = useEthnicitiesStore<Ethnicity[]>([])

    useEffect(() => {
        if (ethnicities.length > 0) {
            return
        }

        fetchEthnicities()
            .then((e) => setEthnicities(e))
            .catch(console.error)
    }, [ethnicities, setEthnicities])

    return ethnicities
}

export default useEthnicities
