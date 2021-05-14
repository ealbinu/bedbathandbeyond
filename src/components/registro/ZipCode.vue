<template lang="pug">
q-input(v-model="zipcodeval" required autocomplete="postal-code" label="Código postal *" v-bind="$inputAttr" mask="#####" :rules="[ val => val && val.length > 3 || 'Campo obligatorio.']" @input="modified")
    template(v-slot:append)
        q-btn(v-bind="$btnAttr" color="primary" label="Verificar" :disable="zipcodeval==null || zipcodeval.length<4" size="sm" @click="verificarCP" v-if="!validated")
</template>

<script>
export default {
    props: ['value'],
    components: {},
    data () {
        return {
            zipcodeval: null,
            validated: false
        }
    },
    methods: {
        modified () {
            this.$emit('input',this.zipcodeval)
            this.$emit('valid', false)
            this.validated = false
        },
        verificarCP () {
            this.$store.dispatch('utilidades/zipcodeValidate', this.zipcodeval).then(res => {
                if(!res.error){
                    this.validated = true
                    var returndata = {
                        StateID: res[0].StateID,
                        zipcodeOps: res,
                        estado: res[0].Estado,
                        municipio: res[0].County,
                    }
                    this.$emit('valid', returndata)
                } else {
                    this.$q.notify('Código Postal no válido.')
                }
            })
        },
    },
    mounted () {
        this.zipcodeval = this.value
        this.validated = true
    }
}
</script>