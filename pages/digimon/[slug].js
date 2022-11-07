import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import DetailDigimon from "../../components/digimon/DetailDigimon"
import ItemEvolution from "../../components/digimon/ItemEvolution"
import Layout from "../../components/Layout"
import Loading from "../../components/Loading"
import clientAxios from "../../config/axios"
import {
    setChangeByChangePage,
    setLastDigimons,
} from "../../features/slice/digimonSlice"
import { validateDigimonsToLocalstorage } from "../../helpers/valid-data"

const ProductScreen = () => {
    const router = useRouter()
    const { slug } = router.query
    const [digimon, setDigimon] = useState({})
    const lastDigimons = useSelector((state) => state.digimon.lastDigimons)
    const dispatch = useDispatch()
    useEffect(() => {
        setDigimon({})
        if (slug) {
            getDigimonBySlug()
            dispatch(setChangeByChangePage())
        }
    }, [slug])
    const getDigimonBySlug = async () => {
        setTimeout(async () => {
            const { data } = await clientAxios.get(`/api/v1/digimon/${slug}`)
            setDigimon(data)
            const newLocalStorage = await validateDigimonsToLocalstorage(
                lastDigimons,
                data
            )
            dispatch(setLastDigimons(newLocalStorage))
        }, 0)
    }
    return (
        <>
            <Layout title={digimon?.name || slug}>
                {!digimon.name ? (
                    <Loading />
                ) : (
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
                )}
            </Layout>
        </>
    )
}

export default ProductScreen

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
