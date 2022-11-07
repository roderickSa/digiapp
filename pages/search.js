import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import ItemEvolution from "../components/digimon/ItemEvolution"
import Layout from "../components/Layout"
import clientAxios from "../config/axios"
import { setChangeByChangePage } from "../features/slice/digimonSlice"

const SearchScreen = () => {
    const router = useRouter()
    const { termino = null } = router.query
    const dispatch = useDispatch()
    const [digimons, setDigimons] = useState([])
    const [buscando, setBuscando] = useState(false)
    useEffect(() => {
        if (termino) {
            setBuscando(true)
            seachByTerm(termino.trim())
            dispatch(setChangeByChangePage())
        }
    }, [termino])
    const seachByTerm = async (term) => {
        const { data } = await clientAxios.get(
            `/api/v1/digimon/buscar/nombre?termino=${term}`
        )
        setDigimons(data)
        setBuscando(false)
    }
    return (
        <>
            <Layout title="Search Digimon">
                {!termino ? (
                    <center>
                        <b>Ingrese un nombre a buscar</b>
                    </center>
                ) : (
                    <>
                        <div>
                            <div>
                                <center>
                                    <b>
                                        <h2>Resultados</h2>
                                    </b>
                                </center>
                            </div>
                            {buscando && (
                                <center>
                                    <b>
                                        <h3>Obteniendo...</h3>
                                    </b>
                                </center>
                            )}
                            {!buscando && digimons.length <= 0 && (
                                <center>
                                    <b>Sin resultados</b>
                                </center>
                            )}
                            {digimons.length > 0 && (
                                <ContainerDigimon>
                                    {digimons.map((digi) => (
                                        <ItemEvolution
                                            key={digi._id}
                                            digimonEvolution={digi}
                                        />
                                    ))}
                                </ContainerDigimon>
                            )}
                        </div>
                    </>
                )}
            </Layout>
        </>
    )
}

export default SearchScreen

const ContainerDigimon = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 1rem;
    gap: 2rem;
    align-items: center;
    justify-content: space-evenly;
    max-width: 100vw;
`
