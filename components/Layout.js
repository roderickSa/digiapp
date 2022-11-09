import Head from "next/head"
import styled from "styled-components"
import Link from "next/link"
import ListBoxLevels from "./ListBoxLevels"
import { useRouter } from "next/router"
import SearchBar from "./SearchBar"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setLastDigimons } from "../features/slice/digimonSlice"

const Layout = ({ title, description = "digimon app", children }) => {
    const router = useRouter()
    const { pathname } = router
    const dispatch = useDispatch()
    const lastDigimons = useSelector((state) => state.digimon.lastDigimons)
    useEffect(() => {
        dispatch(
            setLastDigimons(
                JSON.parse(localStorage.getItem("lastdigimons")) || []
            )
        )
    }, [])
    return (
        <>
            <Head>
                <title>{title ? `${title} - Digmon App` : "Digmon App"}</title>
                <meta name="description" content="Digimon Website" />
                <meta charset="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
                />
                <meta name="language" content="spanish" />
                <meta name="description" content={description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container>
                <header style={{ position: "sticky", top: "0" }}>
                    <ContainerHeader style={styleHeaderColor}>
                        <LeftList>
                            <ItemLeftList>
                                <Link href="/" legacyBehavior>
                                    <a
                                        style={{
                                            fontSize: "1.3rem",
                                            fontWeight: "bold",
                                            color: "#fff",
                                        }}
                                    >
                                        Home
                                    </a>
                                </Link>
                            </ItemLeftList>
                            {lastDigimons.length > 0 && (
                                <ItemLeftList>
                                    <Link href="/lastseen" legacyBehavior>
                                        <a
                                            style={{
                                                fontSize: ".8rem",
                                                fontWeight: "bold",
                                                color: "#fff",
                                            }}
                                        >
                                            Ultimos Vistos
                                        </a>
                                    </Link>
                                </ItemLeftList>
                            )}
                        </LeftList>
                        <RightList>
                            <ItemRightList>
                                <SearchBar />
                            </ItemRightList>
                            {pathname === "/" && (
                                <ItemRightListTwo>
                                    <ListBoxLevels />
                                </ItemRightListTwo>
                            )}
                        </RightList>
                    </ContainerHeader>
                </header>
                <main>{children}</main>
                <ContainerFooter>
                    <span style={{ margin: "0.3rem 0" }}>
                        App created To Practice
                    </span>
                    <span style={{ margin: "0.3rem 0" }}>
                        Created by: rodericksanchezmeza@gmail.com
                    </span>
                    <Link
                        href="https://github.com/roderickSa"
                        legacyBehavior
                        passHref
                    >
                        <a target="_blank">
                            <b>
                                <h4>Github</h4>
                            </b>
                        </a>
                    </Link>
                </ContainerFooter>
            </Container>
        </>
    )
}

export default Layout

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
`

const ContainerHeader = styled.div`
    display: flex;
    justify-content: space-between;
    height: 2.5rem;
    padding: 0.4rem 1rem;
    align-items: center;
`

const ContainerFooter = styled.div`
    background: var(--black);
    color: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const styleHeaderColor = {
    backgroundColor: "var(--black)",
}

const LeftList = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
`

const ItemLeftList = styled.li`
    margin: 0 0.5rem;
`

const RightList = styled.ul`
    display: flex;
    align-items: center;
    position: relative;
`

const ItemRightList = styled.li`
    margin: 0 0.2rem;
`

const ItemRightListTwo = styled.li`
    margin: 0 0.2rem;
    position: relative;
    width: 15rem;
    height: 2rem;
    @media (max-width: 768px) {
        width: 5rem;
    }
    @media (max-width: 480px) {
        width: 2rem;
    }
    > ul {
        @media (max-width: 768px) {
            right: 0;
            width: 50vw !important;
        }
        @media (max-width: 480px) {
            right: 0;
            width: 65vw !important;
        }
    }
`
