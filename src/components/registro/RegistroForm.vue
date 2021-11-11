<template lang="pug">
q-form(@submit.prevent="submit").row.q-pa-xl.q-col-gutter-sm
    
    .col-12
        Email(ref="EmailComp" v-model="user.Email" @validated="emailIsValid = $event")
    template(v-if="emailIsValid")
        .col-12
            q-input(v-model="user.Password" required autocomplete="current-password" label="Contraseña *"  v-bind="$inputAttr" :type="isPwd?'text':'password'" hide-hint hint="6 caracteres mínimo." minlength="6" :rules="[ val => val.length >= 6 || '6 caracteres mínimo.']" ref="Password")
                template(v-slot:append)
                    q-icon(:name="!isPwd?'las la-eye' : 'las la-eye-slash'" @click="isPwd=!isPwd").cursor-pointer
        
    template(v-if="user.Password && user.Password.length>5")
        .col-12: q-separator(color="secondary")
        
        .col-12
            q-input(v-model="user.FirstName" required autocomplete="given-name" label="Nombre(s) *" v-bind="$inputAttr" :rules="[ val => val && val.length > 0 || 'Campo obligatorio.']" ref="FirstName")
        .col-12
            q-input(v-model="user.LastName" required autocomplete="family-name" label="Apellido paterno *" v-bind="$inputAttr" :rules="[ val => val && val.length > 0 || 'Campo obligatorio.']" ref="LastName")
        .col-12
            q-input(v-model="user.LastName2" label="Apellido materno" v-bind="$inputAttr")

        template(v-if="user.FirstName && user.LastName")
            .col-12: q-separator(color="secondary")

            .col-12
                q-input(v-model="user.Phone" label="Teléfono fijo" type="tel" mask="##-####-####" fill-mask unmasked-value v-bind="$inputAttr" hint="10 dígitos.")
            .col-12
                q-input(v-model="user.CellPhone" required autocomplete="tel" type="tel" label="Teléfono celular *" fill-mask mask="##-####-####" unmasked-value  v-bind="$inputAttr" hint="10 dígitos." :rules="[ val => val && val.length >= 10 || '10 dígitos.']" ref="CellPhone")
            
            .col-12
                q-input(v-model="user.BirthDate" required mask="date" fill-mask autocomplete="bday" label="Fecha de nacimiento *" stack-label v-bind="$inputAttr" @change="datePickerSelected")
                    template(v-slot:append)
                        q-icon(name="las la-calendar").cursor-pointer
                            q-popup-proxy(ref="birthproxy"): div
                                q-date(v-model="user.BirthDate" minimal @input="datePickerSelected")

            .col-12
                q-radio(v-model="user.Sex" val="Femenino" label="Femenino")
                q-radio(v-model="user.Sex" val="Masculino" label="Masculino")

            template(v-if="user.CellPhone!=null && user.BirthDate!=null")
                .col-12: q-separator(color="secondary")

                .col-12
                    ZipCode(v-model="user.ZipCode" @valid="validZipCode")

                template(v-if="zipcodeOps.length>0 && user.ZipCode")
                    .col-12
                        q-input(v-model="estado" label="Estado (Verifique código postal)" disable v-bind="$inputAttr")
                    .col-12
                        q-input(v-model="municipio" label="Municipio (Verifique código postal)" disable v-bind="$inputAttr")
                    
                    .col-12
                        q-select(v-model="user.Suburb" :options="colonias"  label="Colonia"  v-bind="$inputAttr")

                    .col-12: q-separator(color="secondary")
                


                    .col-12
                        Politicas(v-model="politicas")
                        
                    template(v-if="politicas")
                        .col-12.q-mt-sm.text-center
                            q-btn(color="primary" label="Registrarme" type="submit" v-bind="$btnAttr")


</template>

<script>
import Email from 'components/registro/Email'
import ZipCode from 'components/registro/ZipCode'
import Politicas from 'components/registro/Politicas'
import { Platform } from 'quasar'
export default {
    props: ['card'],
    components: {
        Politicas,
        ZipCode,
        Email
    },
    data () {
        return {
            isPwd: false,
            zipcodeOps: [],
            estado: null,
            municipio: null,
            emailIsValid: false,
            user: {
                Email: null,
                Password: null,
                FirstName: null,
                LastName: null,
                LastName2: null,
                Phone: null,
                CellPhone: null,
                BirthDate: null,
                Sex: null,
                ZipCode: null,
            },
            politicas: false
        }
    },
    watch: {
        politicas () { this.submitReady() },
        zipcodeOps () { this.submitReady() },
    },
    computed: {
        colonias () {
            var cols = []
            for(var i in this.zipcodeOps){
                const col = this.zipcodeOps[i]
                cols.push(col.Suburb)
            }
            return cols
        },
    },
    methods: {
        datePickerSelected () {
            this.$refs.birthproxy.hide()
            console.log('datepickeeeed')
        },
        submitReady () {
            if(
                this.user.Email &&
                this.user.Password &&
                this.user.FirstName &&
                this.user.LastName &&
                this.user.CellPhone &&
                this.user.StateID &&
                this.politicas &&
                this.zipcodeOps.length > 0
            ) {
                return true
            } else {
                return false
            }
        },
        validZipCode($ev){
            if(!$ev){
                this.zipcodeOps = []
                this.estado,
                this.municipio,
                this.user.StateID,
                this.user.Suburb = null
            } else {
                this.zipcodeOps = $ev.zipcodeOps
                this.estado = $ev.estado
                this.municipio = $ev.municipio
                this.user.StateID = $ev.StateID
                this.user.Suburb = this.colonias[0]
            }
        },
        submit () {
            /*
            if(!this.submitReady()){
                this.$q.notify('Verifica que hayas llenado todos los campos obligatorios.')
                return false
            }
            */
            var request = this.user
            request.CardID = this.card.card
            request.RegisterTypeID = this.$q.platform.is.ios?2:3
            var _this = this
            this.$q.loading.show()
            this.$store.dispatch('usuario/signUp', request).then(res => {
                if(!res.error){
                    _this.$q.notify('Registro exitoso')
                    _this.$router.push('/tarjeta')
                } else {
                    _this.$q.notify('Ocurrió un error. Intente de nuevo.')
                }
                    _this.$q.loading.hide()
            })
        }
    },
    mounted () {
        if(this.card.type=='plastic'){
            const dataAlreadyInCard = this.$store.getters['tarjeta/getcarddata']
            var _this = this
            Object.keys(this.user).forEach(function (key) {
                _this.user[key] = (dataAlreadyInCard[key] || null)
            })
        } else {
            this.$refs.EmailComp.injectmail(this.card.validemail)
        }
    }
}
</script>