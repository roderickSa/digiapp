import Image from "next/image"
import styled from "styled-components"

const DetailDigimon = ({
    images = [],
    descriptions = [],
    fields = [],
    attributes = [],
    levels = [],
    skills = [],
    types = [],
    name = "",
}) => {
    return (
        <>
            <ContainerDetail>
                <ContainerBox>
                    <ContainerBoxSecondary>
                        <div>
                            {images[0]?.href ? (
                                <Image
                                    src={
                                        images[0]?.href ||
                                        "https://res.cloudinary.com/dmys2afnl/image/upload/v1711221002/DIGIMON/noimage_ynk0dq.png"
                                    }
                                    alt={name || "404"}
                                    width={320}
                                    height={320}
                                />
                            ) : (
                                <Image
                                    src="https://res.cloudinary.com/dmys2afnl/image/upload/v1711221002/DIGIMON/noimage_ynk0dq.png"
                                    alt="404"
                                    width={320}
                                    height={320}
                                />
                            )}
                        </div>
                    </ContainerBoxSecondary>
                    <ContainerBoxSecondary>
                        <div>
                            <div>
                                <b>
                                    <h2 style={{ textTransform: "uppercase" }}>
                                        {name}
                                    </h2>
                                </b>
                            </div>
                            <ContainerField>
                                <b>Fields: </b>
                                <span>
                                    {fields.length > 0
                                        ? fields.map((field) => (
                                              <Image
                                                  key={field._id}
                                                  src={
                                                      field.fieldID.images[0]
                                                          .href
                                                  }
                                                  alt={field.fieldID.name}
                                                  width={33}
                                                  height={33}
                                                  style={{ margin: "0 0.5rem" }}
                                              />
                                          ))
                                        : "none"}
                                </span>
                            </ContainerField>
                            <ContainerField>
                                <b>Types: </b>
                                <span>
                                    {types.length > 0
                                        ? types
                                              .map((type) => type.typeID.name)
                                              .join(", ")
                                        : "none"}
                                </span>
                            </ContainerField>
                            <ContainerField>
                                <b>Levels: </b>
                                <span>
                                    {levels.length > 0
                                        ? levels
                                              .map(
                                                  (level) => level.levelID.name
                                              )
                                              .join(", ")
                                        : "none"}
                                </span>
                            </ContainerField>
                            <ContainerField>
                                <b>Attributes: </b>
                                <span>
                                    {attributes.length > 0
                                        ? attributes
                                              .map(
                                                  (attributes) =>
                                                      attributes.attributeID
                                                          .name
                                              )
                                              .join(", ")
                                        : "none"}
                                </span>
                            </ContainerField>
                        </div>
                    </ContainerBoxSecondary>
                </ContainerBox>
                <ContainerBox>
                    <div>
                        <div>
                            <b>Description</b>
                            {descriptions
                                .filter((desc) => desc.language === "en_us")
                                .map((description) => (
                                    <p key={description._id}>
                                        {description.description}
                                    </p>
                                ))}
                        </div>
                        <div>
                            <b>Skills</b>
                            {skills.map((skill) => (
                                <p key={skill._id}>
                                    <b>{skill?.skillID.name}</b>:{" "}
                                    {skill.description}
                                </p>
                            ))}
                        </div>
                    </div>
                </ContainerBox>
            </ContainerDetail>
        </>
    )
}

export default DetailDigimon

const ContainerDetail = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
`
const ContainerBox = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;
    flex-wrap: wrap;
`

const ContainerBoxSecondary = styled.div`
    display: flex;
    justify-content: center;
    align-items: start;
    flex: 1 20rem;
`

const ContainerField = styled.div`
    margin-bottom: 1rem;
`
