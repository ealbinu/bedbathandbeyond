import {api} from 'boot/axios'
import { name } from '../../package.json'


const state = {
    uid: localStorage.getItem(name+'_uid') || null,
    user: JSON.parse(localStorage.getItem(name+'_user') || null) || null
}
const getters = {
    getuid: (state) => state.uid,
    getuser: (state) => state.user,
    isauthenticated: (state) => !!state.user.CustomerID
}
const actions = {
    newuid({commit}, newuid) {
        localStorage.setItem(name+'_uid', newuid)
        commit('SET_UID', newuid)
    },
    async signUp({commit}, body) {
        return new Promise((resolve, reject) => {
            api.post('/App_RegisterNewUser_V110', body).then(res => {
                if(res.data[0].ResultID>=0){
                    var userdata = {
                        CardID: res.data[0].PlasticCardID
                    }
                    localStorage.setItem(name+'_user', JSON.stringify(userdata))
                    commit('SET_USER', userdata)
                    resolve(userdata)
                } else {
                    resolve({error: true})
                }
            })
        })
    },
    async login({commit}, body) {
        return new Promise((resolve, reject) => {
            api.post('/App_AuthenticateUser_V113', body).then(res => {
                if(res.data[0]){
                    var userdata = res.data[0]
                    userdata.Password = body.Password
                    userdata.UserName = body.UserName.toLowerCase()
                    userdata.CardID = res.data[0].PlasticCardID
                    commit('SET_USER',userdata)
                    resolve(userdata)
                } else {
                    resolve({error:true})
                }
            })
        })
    },
    async logout({commit}, body) {
        return new Promise((resolve, reject) => {
            api.post('/App_AuthenticateUser_V113', {UserName:body}).then(res => {
                if(res){
                    commit('UNSET_USER')
                    resolve(res.data[0])
                } else {
                    resolve({error:true})
                }
            })
        })
    },
    async transactions({commit}, body) {
        return new Promise((resolve, reject) => {
            api.post('/App_GetTransactions', body).then(res => {
                if(res.data){
                    resolve(res.data)
                } else {
                    resolve({error:true})
                }
            })
        })
    },
}



const mutations = {
    SET_UID(state, uid) {
        state.uid = uid
    },
    SET_USERID(state, data) {
        state.plasticCardData = data
    },
    SET_USER(state, data) {
        localStorage.setItem(name+'_user', JSON.stringify(data))
        state.user = data
    },
    UNSET_USER(state, data) {
        localStorage.removeItem(name+'_user')
        localStorage.removeItem(name+'_uid')
        state.user = ''
    }
}

export default {
    namespaced: true,
    getters,
    mutations,
    actions,
    state
  }