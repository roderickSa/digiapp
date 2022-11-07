import { useEffect, useState } from "react"
import { Listbox } from "@headlessui/react"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid"
import clientAxios from "../config/axios"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { setChangeTypeSearch } from "../features/slice/digimonSlice"

const allDigimonItem = { name: "All", _id: "0" }

const ListBoxLevels = () => {
    const [selectedLevel, setSelectedLevel] = useState(allDigimonItem)
    const [levels, setLevels] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        const getLevels = async () => {
            const { data: levels } = await clientAxios.get("/api/v1/level")
            setLevels([allDigimonItem, ...levels])
        }
        getLevels()
    }, [])
    const handleSetLevel = ({ _id, name }) => {
        setSelectedLevel({ _id, name })
        const type = name.toLowerCase() === "all" ? 1 : 2
        const levelID = name.toLowerCase() === "all" ? null : _id
        dispatch(setChangeTypeSearch({ type, levelID }))
    }
    return (
        <>
            <Listbox value={selectedLevel?.name} onChange={handleSetLevel}>
                <Listbox.Button style={styleButtonHeader}>
                    <SpanTitle>{selectedLevel?.name}</SpanTitle>
                    <ChevronUpDownIconStyled>
                        <ChevronUpDownIcon
                            aria-hidden="true"
                            style={{ width: "1.25rem" }}
                        />
                    </ChevronUpDownIconStyled>
                </Listbox.Button>
                <Listbox.Options style={styleListHeader}>
                    {levels.map((level) => (
                        <Listbox.Option
                            className="styleListOptionHeaderHover"
                            style={styleListOptionHeader}
                            key={level._id}
                            value={level}
                        >
                            <span
                                style={{
                                    paddingLeft: "2.5rem",
                                }}
                            >
                                {level.name}
                            </span>
                            {selectedLevel?._id === level._id && (
                                <CheckIconStyled>
                                    <CheckIcon
                                        aria-hidden="true"
                                        style={{
                                            width: "1.25rem",
                                        }}
                                    />
                                </CheckIconStyled>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
        </>
    )
}

export default ListBoxLevels

const ChevronUpDownIconStyled = styled.span`
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    padding-right: 0.1rem;
    @media (max-width: 480px) {
        width: 100%;
    }
    > * {
        @media (max-width: 480px) {
            width: 100%!important;
        }
    }
`

const SpanTitle = styled.span`
    @media (max-width: 480px) {
        display: none;
    }
`

const CheckIconStyled = styled.span`
    display: flex;
    left: 0;
    position: absolute;
    top: 0;
    align-items: center;
    height: 100%;
    padding: 0.6rem;
    color: var(--tomate);
`
const styleListHeader = {
    position: "absolute",
    backgroundColor: "rgba(250, 250, 250, 0.9)",
    borderRadius: "0.2rem",
    width: "100%",
    textAlign: "left",
    padding: ".3rem 0",
}

const styleListOptionHeader = {
    padding: "0.6rem 0",
    position: "relative",
}

const styleButtonHeader = {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    padding: "0.4rem 0 0.4rem 0.4rem",
    borderRadius: "0.3rem",
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    border: "none",
}
