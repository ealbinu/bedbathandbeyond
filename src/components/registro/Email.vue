<template lang="pug">
    
    q-input(v-model="email" required autocomplete="username" :disable="valid" type="email" label="Correo electrónico *" v-bind="$inputAttr" :rules="[ val => val && val.length > 3 || 'Ingresa una dirección válida.']" ref="Email" @input="$emit('input', email)")
        template(v-slot:append)
            q-btn(v-bind="$btnAttr" color="primary" label="Verificar" :disable="email==null || email.length<4" size="sm" @click="verificar" v-if="!valid")
            q-icon(name="las la-check" color="secondary" v-if="valid")
</template>

<script>
export default {
    props: ['value'],
    data () {
        return {
            email: null,
            valid: false,
        }
    },
    methods: {
        injectmail (email) {
            this.email = email
            this.valid = true
            this.$emit('input', this.email)
            this.$emit('validated', true)
        },
        verificar () {
            var _this = this
            _this.$q.loading.show()
            _this.$store.dispatch('usuario/verificarEmail', _this.email).then(res=>{
                if(res.error==true){
                    _this.$q.notify({
                        message: 'Ya hay una cuenta con esta dirección de correo.',
                        actions: [
                            { label: 'Recuperar acceso', color: 'white', handler: () => {
                                _this.dialogDigital = false
                                _this.$router.push({path: '/', query: {recover: _this.email} } )
                            } },
                        ]
                    })
                } else {
                    //this.validEmailProceed()
                    _this.$emit('validated', true)
                    _this.valid = true
                    _this.$q.notify('Correo verificado. Completa los siguientes datos.')
                }
                _this.$q.loading.hide()
            })

        }
    }
}
</script>