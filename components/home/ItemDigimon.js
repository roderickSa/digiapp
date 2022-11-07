import Image from "next/image"
import Link from "next/link"
import styled from "styled-components"

const ItemDigimon = ({ digimon }) => {
    const {
        name,
        slug,
        images,
        attributes = [],
        fields = [],
        levels = [],
        types = [],
    } = digimon
    const getFields = () => {
        if (fields.length <= 3) return fields

        return fields.slice(0, 3)
    }
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
                            width={290}
                            height={290}
                        />
                        <ContainerDetail>
                            <ListaDetalle>
                                <li>
                                    <ItemLista>
                                        <b>Atribute</b>
                                        {attributes.length > 0 ? (
                                            <span>
                                                {attributes[0].attributeID.name}
                                            </span>
                                        ) : (
                                            <span>none</span>
                                        )}
                                    </ItemLista>
                                </li>
                                <li>
                                    <ItemLista>
                                        <b>Level</b>
                                        {levels.length > 0 ? (
                                            <span>
                                                {levels[0].levelID.name}
                                            </span>
                                        ) : (
                                            <span>none</span>
                                        )}
                                    </ItemLista>
                                </li>
                                <li>
                                    <ItemLista>
                                        <b>Type</b>
                                        {types.length > 0 ? (
                                            <span>{types[0].typeID.name}</span>
                                        ) : (
                                            <span>none</span>
                                        )}
                                    </ItemLista>
                                </li>
                            </ListaDetalle>
                            <ListaDetalle>
                                <li style={{ width: "100%" }}>
                                    <ItemLista>
                                        <b>Fields</b>
                                        {fields.length > 0 ? (
                                            <ContainerFields>
                                                {getFields().map((field) => (
                                                    <Image
                                                        key={field._id}
                                                        src={
                                                            field.fieldID
                                                                .images[0].href
                                                        }
                                                        alt={field.fieldID.name}
                                                        width={33}
                                                        height={33}
                                                    />
                                                ))}
                                            </ContainerFields>
                                        ) : (
                                            <span>none</span>
                                        )}
                                    </ItemLista>
                                </li>
                            </ListaDetalle>
                        </ContainerDetail>
                    </BoxDigimon>
                </a>
            </Link>
        </>
    )
}

export default ItemDigimon

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
    max-width: 290px;
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

const ContainerDetail = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    border-top: 1px solid rgba(0, 0, 0, 0.5);
`
const ListaDetalle = styled.ul`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 0.5rem 0;
`

const ItemLista = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
`

const ContainerFields = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100%;
`
