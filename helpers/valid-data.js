export const validateDigimonsRepeat = (preData, newData) => {
    let result = [...preData]
    for (const digimon of newData) {
        const inx = result.findIndex((digi) => digi._id === digimon._id)
        if (inx === -1) {
            result.push(digimon)
        }
    }
    return result
}

export const validateDigimonsToLocalstorage = (preData, { _id, name, images, slug, levels }) => {
    let result = [...preData]
    const inx = result.findIndex((digi) => digi._id === _id)
    if (inx === -1) {
        result.push({ _id, name, images, slug, levels })
    }
    if(result.length === 16){
        result.shift()
    }
    return result
}
