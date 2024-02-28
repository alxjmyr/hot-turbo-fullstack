import axios from 'axios';

const env = import.meta.env.VITE_APP_ENV
const backendUrl = import.meta.env.VITE_API_BASE_URL
const backendV1 = import.meta.env.VITE_API_V1_PREFIX
const baseUrl = `${backendUrl}/${backendV1}/`

console.log(`Api Client Loaded in ${env} mode`)

export const api = {
    async getHello() {
        return axios.get(`${backendUrl}/${backendV1}/hello`)
    },
    async getLoginToken(email, password) {
        return axios.post(`${baseUrl}/token`, `grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`, { headers: { "Content-Type": "application/x-www-form-urlencoded" }, })
    }
};