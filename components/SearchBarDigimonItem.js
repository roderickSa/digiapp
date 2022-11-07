import Image from "next/image"
import Link from "next/link"
import styled from "styled-components"

const SearchBarDigimonItem = ({ digimon }) => {
    const { _id, slug, images, name } = digimon
    return (
        <>
            <Link href={`/digimon/${slug}`} legacyBehavior key={_id}>
                <a>
                    <ItemSearch>
                        <Image
                            style={{
                                objectFit: "none",
                            }}
                            src={images?.[0].href}
                            alt={name}
                            width={120}
                            height={120}
                        />
                        <span>
                            <H6>{name}</H6>
                        </span>
                    </ItemSearch>
                </a>
            </Link>
        </>
    )
}

export default SearchBarDigimonItem

const ItemSearch = styled.div`
    flex: 1 7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0.5rem 0;
    gap: 0.5rem;
    min-width: 120px;
    max-width: 140px;
`

const H6 = styled.h6`
    margin: 0 0.3rem;
    overflow: hidden;
    max-width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    white-space: nowrap;
    overflow: hidden;
    max-width: 120px;
`