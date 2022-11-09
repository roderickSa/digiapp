import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import DetailDigimon from "../../components/digimon/DetailDigimon"
import ItemEvolution from "../../components/digimon/ItemEvolution"
import Layout from "../../components/Layout"
import clientAxios from "../../config/axios"
import {
    setChangeByChangePage,
    setLastDigimons,
} from "../../features/slice/digimonSlice"
import { validateDigimonsToLocalstorage } from "../../helpers/valid-data"

const ProductScreen = ({ digimon }) => {
    const router = useRouter()
    const lastDigimons = useSelector((state) => state.digimon.lastDigimons)
    const dispatch = useDispatch()
    useEffect(() => {
        if (digimon) {
            dispatch(setChangeByChangePage())
            verifyDigimonLocalStorage()
        }
    }, [digimon])
    const verifyDigimonLocalStorage = async () => {
        const newLocalStorage = await validateDigimonsToLocalstorage(
            lastDigimons,
            digimon
        )
        dispatch(setLastDigimons(newLocalStorage))
    }
    if (router.isFallback) {
        return (
            <Layout title="Digimon app">
                <center>Loading...</center>
            </Layout>
        )
    }
    if (digimon === undefined || digimon === null) {
        return (
            <Layout title="Digimon not Found">
                <center>Digimon not found</center>
            </Layout>
        )
    }
    return (
        <>
            <Layout title={digimon?.name} description={digimon?.name}>
                <>
                    <DetailDigimon
                        images={digimon?.images}
                        name={digimon?.name}
                        fields={digimon?.fields}
                        types={digimon?.types}
                        levels={digimon?.levels}
                        attributes={digimon?.attributes}
                        skills={digimon?.skills}
                        descriptions={digimon?.descriptions}
                    />
                    {digimon?.priorEvolutions?.length > 0 && (
                        <div>
                            <ContainerTitle>
                                <b>Prior Evolutions</b>
                            </ContainerTitle>
                            <ContainerDigimon>
                                {digimon.priorEvolutions.map((digi) => (
                                    <ItemEvolution
                                        key={digi._id}
                                        digimonEvolution={digi.digimonID}
                                    />
                                ))}
                            </ContainerDigimon>
                        </div>
                    )}
                    {digimon?.nextEvolutions?.length > 0 && (
                        <div>
                            <ContainerTitle>
                                <b>Next Evolutions</b>
                            </ContainerTitle>
                            <ContainerDigimon>
                                {digimon.nextEvolutions.map((digi) => (
                                    <ItemEvolution
                                        key={digi._id}
                                        digimonEvolution={digi.digimonID}
                                    />
                                ))}
                            </ContainerDigimon>
                        </div>
                    )}
                </>
            </Layout>
        </>
    )
}

export default ProductScreen

export async function getStaticPaths() {
    //podriamos recorrer todas los slug y crear las rutas
    //pero dejaremos que se generen automaticamente
    return {
        paths: [],
        fallback: true,
    }
}

export async function getStaticProps(context) {
    const { slug } = context.params
    try {
        const { data } = await clientAxios.get(`/api/v1/digimon/${slug}`)
        return {
            props: {
                digimon: !data.errors ? data : null,
            },
        }
    } catch (error) {
        return {
            props: {
                digimon: null,
            },
        }
    }
}

const ContainerDigimon = styled.div`
    display: flex;
    flex-wrap: nowrap;
    padding: 1rem;
    gap: 1rem;
    align-items: center;
    max-width: 100vw;
    overflow-x: auto;
`

const ContainerTitle = styled.div`
    display: flex;
    justify-content: center;
    font-size: 1.4rem;
`
