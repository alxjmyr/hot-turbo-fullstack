import axios from 'axios';

const env = import.meta.env.VITE_APP_ENV
const backendUrl = import.meta.env.VITE_API_BASE_URL

console.log(`Api Client Loaded in ${env} mode`)

export const api = {
    async getHello() {
        return axios.get(`${backendUrl}/hello`)
    }
}