import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios


const api = axios.create({
    baseURL:'https://bluetest.mx/bedbathandbeyond/BlueEngine_JWS/Service1.svc',
    headers: { 'content-type': 'text/plain' },
})
Vue.prototype.$api = api

export {axios, api}