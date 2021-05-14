import {api} from 'boot/axios'

const state = {
    
}
const getters = {
    
}
const actions = {
    async zipcodeValidate({commit}, body) {
        const request = {ZipCode:body}
        return new Promise((resolve, reject) => {
            api.post('/App_ValidateZipCodeInfo', request).then(res => {
                if(res.data[0].ResultID>=0){
                    resolve(res.data)
                } else {
                    resolve({error: true})
                }
            })
        })
    }
}
const mutations = {
    SET_CARDDATA(state, data) {
        state.plasticCardData = data
    }
}

export default {
    namespaced: true,
    getters,
    mutations,
    actions,
    state
  }