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
        return axios.post(`${baseUrl}token`, `grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`, { headers: { "Content-Type": "application/x-www-form-urlencoded" }, })
    },
    async requestPasswordRecovery(email) {
        return axios.post(`${baseUrl}password-reset/${email}`, { headers: { "Content-Type": "application/json" } })
    },
    async recoverPassword(recoveryToken, password) {
        const reset = {
            token: recoveryToken,
            password: password
        }
        return axios.post(`${baseUrl}recover-password`, reset, { headers: { "Content-Type": "application/json" } })
    },
    async createUser(name, email, password) {
        return axios.post(`${baseUrl}users`, { name: name, email: email, password: password }, { headers: { "Content-Type": "application/json" }, })
    },
    async getUser(token) {
        return axios.get(`${baseUrl}users/me`, { headers: { "Content-Type": "application/json", Authorization: "Bearer " + token, } })
    },
    async patchUser(token, name, email, is_active) {
        return axios.patch(`${baseUrl}users/me`, { name: name, email: email, is_active: is_active }, { headers: { "Content-Type": "application/json", Authorization: "Bearer " + token, } })
    }
};