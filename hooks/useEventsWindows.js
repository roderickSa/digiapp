import { useRef } from "react"
import { useState } from "react"
import { useEffect } from "react"

const useEventsWindows = () => {
    const [openbar, setOpenbar] = useState(false)
    const refWindowBar = useRef(null)
    useEffect(() => {
        document.addEventListener("keydown", handleEscapeKey)
        document.addEventListener("click", closeWindowBar)

        return () => {
            document.removeEventListener("keydown", handleEscapeKey)
            document.removeEventListener("click", closeWindowBar)
        }
    }, [refWindowBar, openbar])
    const handleEscapeKey = (event) => {
        if (event.code === "Escape") {
            setOpenbar(false)
        }
    }
    const closeWindowBar = (event) => {
        if (
            refWindowBar.current &&
            openbar &&
            !refWindowBar.current.contains(event.target)
        ) {
            setOpenbar(false)
        }
    }
    return { openbar, setOpenbar, refWindowBar }
}

export default useEventsWindows
