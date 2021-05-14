<template lang="pug">
q-form(@submit.prevent="submit").row.q-pa-xl
    .col-12
        q-input(v-model="login.UserName" required autocomplete="username" type="email" label="Correo electrónico" v-bind="$inputAttr")
    .col-12.q-mt-sm
        q-input(v-model="login.Password" required autocomplete="current-password" label="Contraseña"  v-bind="$inputAttr" :type="isPwd?'text':'password'" :rules="[ val => val.length >= 6 || '6 caracteres mínimo.']")
            template(v-slot:append)
                q-icon(:name="!isPwd?'las la-eye' : 'las la-eye-slash'" @click="isPwd=!isPwd").cursor-pointer
    .col-12.q-mt-sm.text-center
        q-btn(color="primary" label="Iniciar sesión" type="submit" v-bind="$btnAttr")
</template>

<script>
export default {
    data () {
        return {
            isPwd: false,
            login: {
                UserName: null,
                Password: null
            }
        }
    },
    methods: {
        submit () {
            this.$store.dispatch('usuario/login', this.login).then(res=>{
                if(!res.error){
                    this.$router.push('/tarjeta')
                } else {
                    this.$q.notify('Verifique sus datos.')
                }
            })
        }
    }
}
</script>