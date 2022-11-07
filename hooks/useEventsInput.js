import { useEffect } from "react"
import { useRef } from "react"

const useEventsInput = () => {
    const refInput = useRef(null)
    useEffect(() => {
        refInput.current.addEventListener("mouseover", placeholderover)
        refInput.current.addEventListener("mouseout", placeholderout)

        return () => {
            document.removeEventListener("mouseover", placeholderover)
            document.removeEventListener("mouseout", placeholderout)
        }
    }, [refInput])
    const placeholderover = () => {
        refInput.current.setAttribute("placeholder", "Min 3 Letras")
    }
    const placeholderout = () => {
        refInput.current.setAttribute("placeholder", "Buscar Digimon...")
    }
    return { refInput }
}

export default useEventsInput
