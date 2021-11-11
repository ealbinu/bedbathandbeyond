import {api} from 'boot/axios'
import { name } from '../../package.json'
import { uid } from 'quasar'

const state = {
    //uid: localStorage.getItem(name+'_uid') || null,
    uid: uid(),
    user: JSON.parse(localStorage.getItem(name+'_user') || null) || null,
    userinfo: null,
}
const getters = {
    getuid: (state) => state.uid,
    getuser: (state) => state.user,
    getuserinfo: (state) => state.userinfo,
    isauthenticated: (state) => !!state.user.CustomerID
}
const actions = {
    newuid({commit}, newuid) {
        localStorage.setItem(name+'_uid', newuid)
        commit('SET_UID', newuid)
    },
    async signUp({commit}, request) {
        return new Promise((resolve, reject) => {
            api.post('/App_RegisterNewUser_V110', request).then(res => {
                if(res.data[0].ResultID>=0){
                    console.log('Registro ok')
                    // LOGIN al recibir ok
                    var body = {
                        UserName: request.Email,
                        Password: request.Password,
                    }
                    api.post('/App_AuthenticateUser_V113', body).then(res => {
                        if(res.data[0]){
                            console.log('Login Ok')
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
                    


                } else {
                    resolve({error: true})
                }
            })
        })
    },
    async info({commit}, body) {
        return new Promise((resolve, reject) => {
            api.post('/App_GetUserInfo_V125', body).then(res => {
                if(res.data[0]){
                    commit('SET_USERINFO',res.data[0])
                    resolve(res.data[0])
                } else {
                    resolve({error:true})
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
            commit('UNSET_USER')
            resolve({})
            /*
            api.post('/App_PostSignOut', {UserName:body}).then(res => {
                if(res){
                    commit('UNSET_USER')
                    resolve(res.data[0])
                } else {
                    resolve({error:true})
                }
            })
            */
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
    async verificarEmail({commit}, email) {
        return new Promise((resolve, reject) => {
            api.post('/App_ValidateEmail', {Email:email}).then(res => {
                if(res.data[0]){
                    resolve({error: false})
                } else {
                    resolve({error:true})
                }
            })
        })
    },
    
    async recuperar({commit}, email) {
        return new Promise((resolve, reject) => {
            api.post('/App_RecoverEmail', {UID:email}).then(res => {
                console.log(res.data[0])
                if(res.data[0]){
                    resolve({error: false})
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
    SET_USERINFO(state, data) {
        state.userinfo = data
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