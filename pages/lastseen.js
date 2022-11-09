import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import ItemEvolution from "../components/digimon/ItemEvolution"
import Layout from "../components/Layout"
import { setChangeByChangePage } from "../features/slice/digimonSlice"

const LastseenScreen = () => {
    const lastDigimons = useSelector((state) => state.digimon.lastDigimons)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setChangeByChangePage())
    }, [])
    return (
        <>
            <Layout
                title="Ultimos Digimons Vistos"
                description="Ultimos Digimons Vistos"
            >
                <div>
                    <div>
                        <center>
                            <b>
                                <h2>Ultimos Digimons Vistos</h2>
                            </b>
                        </center>
                    </div>
                    {lastDigimons.length > 0 && (
                        <ContainerDigimon>
                            {lastDigimons.map((digi) => (
                                <ItemEvolution
                                    key={digi._id}
                                    digimonEvolution={digi}
                                />
                            ))}
                        </ContainerDigimon>
                    )}
                </div>
            </Layout>
        </>
    )
}

export default LastseenScreen

const ContainerDigimon = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 1rem;
    gap: 2rem;
    align-items: center;
    justify-content: space-evenly;
    max-width: 100vw;
`
