<template lang="pug">
div.text-center
    q-btn(flat label="¿Olvidaste tu contraseña?" color="primary" @click="dialog=true" no-caps)
    q-dialog(v-model="dialog")
        q-card(flat)
            q-toolbar.text-center.bg-primary.text-white
                q-toolbar-title().text-body1 ¿Olvidaste tu contraseña?
            q-card-section
                .text-center Ingresa el correo electrónico con el que te registraste.
                q-form(@submit.prevent="submit").row.text-center.q-mt-lg
                    .col-12
                        q-input(v-model="useremail" required autocomplete="username" label="Correo electrónico" v-bind="$inputAttr")
                    .col-12.q-mt-sm
                        q-btn(color="primary" label="Recuperar contraseña" type="submit" v-bind="$btnAttr")
</template>
<script>
export default {
    data () {
        return {
            dialog: false,
            useremail: null
        }
    },
    methods: {
        submit() {
            this.$q.loading.show()
            var _this = this
            this.$store.dispatch('usuario/recuperar', this.useremail).then(res => {
                
                if(!res.error){
                    _this.$q.notify('Se ha enviado un mensaje a la dirección de correo ingresada.')
                    this.dialog = false
                    this.useremail = null
                } else {
                    _this.$q.notify('Ocurrió un error. No encontramos tu correo ligado a una cuenta de ' + this.$appName)
                }
                this.$q.loading.hide()
            })
        }
    }
}
</script>