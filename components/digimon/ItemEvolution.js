import Image from "next/image"
import Link from "next/link"
import styled from "styled-components"

const ItemEvolution = ({ digimonEvolution }) => {
    if (!digimonEvolution) {
        return (
            <>
                <BoxDigimon>
                    <ContentName>
                        <ParagraphName>Digimon not found</ParagraphName>
                    </ContentName>
                    <Image
                        src="https://res.cloudinary.com/dmys2afnl/image/upload/v1711221002/DIGIMON/noimage_ynk0dq.png"
                        alt="404"
                        width={210}
                        height={210}
                    />
                </BoxDigimon>
            </>
        )
    }
    const { name, slug, images } = digimonEvolution
    return (
        <>
            <Link href={`/digimon/${slug}`} legacyBehavior>
                <a>
                    <BoxDigimon>
                        <ContentName>
                            <ParagraphName>{name}</ParagraphName>
                        </ContentName>
                        <Image
                            src={images?.[0].href}
                            alt={name}
                            width={210}
                            height={210}
                        />
                    </BoxDigimon>
                </a>
            </Link>
        </>
    )
}

export default ItemEvolution

const BoxDigimon = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    max-width: 25rem;
    box-shadow: 1px 1px 0px 0px;
    padding-bottom: 1rem;
    background-color: rgba(250, 250, 250, 0.9);
    max-width: 210px;
    &:hover {
        box-shadow: 2px 2px 3px 1px;
    }
`
const ContentName = styled.div`
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    width: 100%;
    text-align: center;
    font-size: 1.4rem;
`
const ParagraphName = styled.p`
    margin: 0.5rem 0px;
    overflow: hidden;
    max-width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
`
