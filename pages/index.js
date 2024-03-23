import { useEffect } from "react"
import styled from "styled-components"
import ItemDigimon from "../components/home/ItemDigimon"
import Layout from "../components/Layout"
import clientAxios from "../config/axios"
import { useSelector, useDispatch } from "react-redux"
import {
    setDigimons,
    setIsFetching,
    setPage,
} from "../features/slice/digimonSlice"
import { validateDigimonsRepeat } from "../helpers/valid-data"
import Loading from "../components/Loading"

const URL_ALL_DIGIMONS = "/api/v1/digimon"
const URL_LEVEL_DIGIMONS = "/api/v1/digimon/level"

export default function Home() {
    const digimons = useSelector((state) => state.digimon.digimons)
    const typeSearch = useSelector((state) => state.digimon.typeSearch)
    const page = useSelector((state) => state.digimon.page)
    const levelID = useSelector((state) => state.digimon.levelID)
    const isFetching = useSelector((state) => state.digimon.isFetching)
    const dispatch = useDispatch()
    useEffect(() => {
        getDigimons()
        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        if (!isFetching) return

        getDigimons()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetching])
    const getDigimons = async () => {
        const seconds = page === 1 ? 500 : 0
        setTimeout(async () => {
            const url_send =
                typeSearch === 1
                    ? `${URL_ALL_DIGIMONS}?page=${page}`
                    : `${URL_LEVEL_DIGIMONS}/${levelID}?page=${page}`
            const { data } = await clientAxios.get(url_send)
            dispatch(setIsFetching(false))
            dispatch(setPage())
            const newData = validateDigimonsRepeat(digimons, data.digimons)
            dispatch(setDigimons(newData))
            //aca podriamos validar si no trae mas digimon, entonces quitamos el evento scroll
        }, seconds)
    }
    const handleScroll = () => {
        if (
            Math.ceil(
                window.innerHeight + document.documentElement.scrollTop
            ) !== document.documentElement.offsetHeight ||
            isFetching
        ) {
            return
        }
        dispatch(setIsFetching(true))
    }
    return (
        <>
            <Layout title="Digimon Home Page" description="Digimon Home Page">
                {digimons.length <= 0 && !isFetching ? (
                    <Loading />
                ) : (
                    <ContainerDigimon>
                        {digimons?.map((digimon) => (
                            <ItemDigimon key={digimon._id} digimon={digimon} />
                        ))}
                    </ContainerDigimon>
                )}
                {isFetching && <Loading />}
            </Layout>
        </>
    )
}

const ContainerDigimon = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 2rem 3rem;
    gap: 4rem;
    align-items: center;
    justify-content: space-evenly;
`
