import axios from "axios"
import getConfig from "next/config"
const { publicRuntimeConfig } = getConfig()

const clientAxios = axios.create({
    baseURL: publicRuntimeConfig.API_URL,
})

export default clientAxios
