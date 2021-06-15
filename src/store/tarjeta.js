import {api} from 'boot/axios'

const state = {
    card: null
}
const getters = {
    getcarddata: (state) => state.card
}
const actions = {
    async validateCard({commit}, body) {
        const request = {PlasticCardID:body}
        return new Promise((resolve, reject) => {
            api.post('/App_ValidateCardInfo_V110', request).then(res => {
                if(res.data[0].ResultID>0){
                    commit('SET_CARDDATA', res.data[0])
                    resolve(res.data[0])
                } else {
                    resolve({error: true})
                }
            })
        })
    },
    async generateDigitalCard({commit}, body) {
        return new Promise((resolve, reject) => {
            api.post('/App_PostVirtualCard', body).then(res => {
                if(res.data[0]){
                    commit('SET_CARDDATA', res.data[0])
                    resolve(res.data[0])
                } else {
                    resolve({error: true})
                }
            })
        })
    },
}
const mutations = {
    SET_CARDDATA(state, data) {
        state.card = data
    }
}

export default {
    namespaced: true,
    getters,
    mutations,
    actions,
    state
  }