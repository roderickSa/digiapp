import SearchIcon from "@mui/icons-material/Search"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styled from "styled-components"
import clientAxios from "../config/axios"
import useEventsInput from "../hooks/useEventsInput"
import useEventsWindows from "../hooks/useEventsWindows"
import SearchBarDigimonItem from "./SearchBarDigimonItem"

const SearchBar = () => {
    const router = useRouter()
    const [value, setValue] = useState("")
    const [buscando, setBuscando] = useState(false)
    const [elements, setElements] = useState([])
    const { openbar, setOpenbar, refWindowBar } = useEventsWindows()
    const { refInput } = useEventsInput()
    useEffect(() => {
        if (value.trim().length < 3) {
            setOpenbar(false)
            setBuscando(false)
            return
        }

        setBuscando(true)
        seachByTerm(value.trim())
    }, [value])
    const handleSubmit = async (event) => {
        event.preventDefault()
        if (value.trim().length < 3) return
        setBuscando(true)
        seachByTerm(value.trim())
    }
    const seachByTerm = async (term) => {
        const { data } = await clientAxios.get(
            `/api/v1/digimon/buscar/nombre?termino=${term}`
        )
        setOpenbar(true)
        setElements(data)
        setBuscando(false)
    }
    const getFirstElements = (elements) => {
        if (elements.length <= 4) return elements

        return elements.slice(0, 4)
    }
    const handleSearch = () => {
        router.push(`/search?termino=${value}`)
        setOpenbar(false)
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Container>
                    <Input
                        ref={refInput}
                        type="text"
                        name=""
                        placeholder="Buscar Digimon..."
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                    />
                    <Button type="submit">
                        <SearchIcon
                            sx={{
                                color: "var(--tomate)",
                                "&:hover": { fontSize: 30 },
                            }}
                            fontSize="small"
                        />
                    </Button>
                    {openbar && !buscando && (
                        <SearchDiv ref={refWindowBar}>
                            <ContentElements>
                                {getFirstElements(elements).map((digimon) => (
                                    <SearchBarDigimonItem
                                        digimon={digimon}
                                        key={digimon._id}
                                    />
                                ))}
                            </ContentElements>
                            {elements.length > 0 && (
                                <ContentMore>
                                    <span>
                                        <h5>
                                            Busquedas encontrados:{" "}
                                            {elements.length}
                                        </h5>
                                    </span>
                                    <span>
                                        <h5>
                                            <MyButton
                                                type="button"
                                                onClick={handleSearch}
                                            >
                                                Ver Todo
                                            </MyButton>
                                        </h5>
                                    </span>
                                </ContentMore>
                            )}
                        </SearchDiv>
                    )}
                    {buscando && (
                        <SearchDiv ref={refWindowBar}>
                            <center>Buscando...</center>
                        </SearchDiv>
                    )}
                </Container>
            </form>
        </>
    )
}

export default SearchBar

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2rem;
    background: #fff;
    border-radius: 3px;
`

const Input = styled.input`
    height: 100%;
    border: none;
    font-size: 1rem;
    background: none;
    padding-left: 0.8rem;
    width: 8rem;
    transition: 0.5s ease;
    &:hover,
    &:focus-visible {
        width: 12rem;
        outline: none;
    }
    @media (max-width: 768px) {
        width: 6rem;
        &:hover,
        &:focus-visible {
            width: 8rem;
            outline: none;
        }
    }
    @media (max-width: 480px) {
        width: 4rem;
        &:hover,
        &:focus-visible {
            width: 6rem;
            outline: none;
        }
    }
`

const Button = styled.button`
    background: none;
    border: none;
    height: 100%;
    padding: 0;
    width: 2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 1px solid rgba(0, 0, 0, 0.8);
    &:focus,
    &:hover {
        background: var(--rojos);
    }
    &:focus-visible {
        outline: none;
    }
`

const SearchDiv = styled.div`
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 0.2rem;
    width: 60vw;
    background: #fff;
    border-radius: 3px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    @media (max-width: 768px) {
        width: 90vw;
    }
`

const ContentElements = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
`

const ContentMore = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
`

const MyButton = styled.button`
    cursor: pointer;
    color: var(--tomate);
    border: none;
    background: none;
    &:hover {
        text-decoration: underline;
    }
`
