<template lang="pug">
div.row.column.q-my-xl.text-center
    q-card.bg-grey-3.q-ma-sm(flat): q-card-section
        .text-body1 ¡Si ya cuentas con tu tarjeta plástica #[br] #[strong.text-primary {{$appName}}] #[br] registra tus datos!
        .text-center.q-mt-md
            q-btn(color="primary" label="Registrarme" v-bind="$btnAttr" @click="dialogPlastic = true")
    q-card.bg-grey-3.q-ma-sm(flat): q-card-section
        .text-body1.q-mt-lg ¡Obtén tu tarjeta digital #[br] #[strong.text-primary {{$appName}}] #[br] GRATIS!
        .text-center.q-mt-md
            q-btn(color="primary" label="Obtenerla" v-bind="$btnAttr" @click="dialogDigital = true")
    
    q-dialog(v-model="dialogPlastic")
        q-card(flat)
            q-toolbar.text-center.bg-primary.text-white
                q-toolbar-title().text-body1 Registra tus datos
            q-card-section
                .text-center Ingresa el número de 16 dígitos de tu tarjeta #[br] #[strong.text-primary {{$appName}}]
                q-form(@submit.prevent="submitPlastic").row.text-center.q-mt-lg
                    .col-12
                        q-input(v-model="plasticCard" required label="Número de tarjeta" v-bind="$inputAttr" unmasked-value mask="####-####-####-####")
                    .col-12.q-mt-sm
                        q-btn(color="primary" label="Verificar tarjeta" type="submit" v-bind="$btnAttr")
    
    q-dialog(v-model="dialogDigital" :persistent="persistent")
        q-card(flat)
            q-toolbar.text-center.bg-primary.text-white
                q-toolbar-title().text-body1 Tarjeta digital
            q-card-section
                .text-center Ingresa tu correo para obtener tu tarjeta digital #[br] #[strong.text-primary {{$appName}}]
                q-form(@submit.prevent="submitDigital").row.text-center.q-mt-lg
                    .col-12
                        q-input(v-model="email" required label="Correo electrónico" v-bind="$inputAttr")
                    .col-12.q-mt-sm
                        q-btn(color="primary" label="Obtener tarjeta digital" type="submit" v-bind="$btnAttr")
</template>
<script>
import { Platform } from 'quasar'
export default {
    data () {
        return {
            dialogPlastic: false,
            dialogDigital: false,
            plasticCard: null,
            digitalCard: null,
            persistent: false,
            email: null,
        }
    },
    methods: {
        submitPlastic () {
            this.$q.loading.show()
            this.$store.dispatch('tarjeta/validateCard', this.plasticCard).then(res => {
                this.$q.loading.hide()
                if(!res.error){
                    this.$emit('tarjetaValida', {card: this.plasticCard, type:'plastic'})
                    this.dialogPlastic = false
                    this.$q.notify('Tarjeta ' + this.plasticCard + ' válida.')
                } else {
                    this.$q.notify('Tarjeta no válida. Verifica la información ingresada.')
                }
            })
        },
        submitDigital () {
            //Verificar email
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
                    this.validEmailProceed()
                }
                _this.$q.loading.hide()
            })

        },
        validEmailProceed () {
            var _this = this
            const request = {
                HWID: _this.$store.getters['usuario/getuid'],
                ProductID: "free",
                LocalOffset: _this.$timezoneb64,
                Purchased: 1,
                Registered: 0,
                CardID: "258",
                UID: _this.email,
                Platform: _this.$q.platform.is.ios?'ios':'android',
                TransactionID: "000"
            }
            _this.$store.dispatch('tarjeta/generateDigitalCard', request).then(res => {
                _this.$q.loading.hide()
                _this.dialogDigital = false
                if(!res.error){
                    _this.$emit('tarjetaValida', {card: res.CardID, type:'digital', validemail: _this.email})
                    _this.$q.notify('Tarjeta generada: ' + res.CardID)
                } else {
                    _this.$q.notify('Ocurrió un error. Intenta de nuevo.')
                }
            })
        }
    },
    mounted () {
        console.log( this.$store.getters['usuario/getuid'] )
    }
}
</script>