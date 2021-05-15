import {api} from 'boot/axios'

const state = {
    listado: null
}
const getters = {
    getlistado: (state) => state.listado
}
const actions = {
    async obtener({commit}, request) {
        return new Promise((resolve, reject) => {
            api.post('/App_GetPromotions_General_V110', request).then(res => {
                if(res.data){
                    commit('SET_LISTADO', res.data)
                    resolve(res.data)
                } else {
                    resolve({error: true})
                }
            })
        })
    },
}
const mutations = {
    SET_LISTADO(state, data) {
        state.listado = data
    }
}

export default {
    namespaced: true,
    getters,
    mutations,
    actions,
    state
  }