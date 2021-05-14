<template lang="pug">
div.text-caption
    .row.q-my-lg
        .col-2: q-checkbox(v-model="aceptaTYC" @input="selected")
        .col
            | Acepto 
            q-btn(label="Términos y Condiciones" text-color="primary" flat dense no-caps padding="0" @click="dialogTYC=true") 
            |  de #[strong {{$appName}}].
    
    .row.q-my-lg
        .col-2: q-checkbox(v-model="aceptaAviso"  @input="selected")
        .col
            | Estoy de acuerdo con el 
            q-btn(label="Aviso de Privacidad" text-color="primary" flat dense no-caps padding="0" @click="dialogAviso=true")
            |  de #[strong {{$appName}}].
    
    q-dialog(v-model="dialogTYC"): TerminosYCondiciones
    q-dialog(v-model="dialogAviso"): AvisoDePrivacidad

</template>

<script>
import TerminosYCondiciones from 'components/TerminosYCondiciones'
import AvisoDePrivacidad from 'components/AvisoDePrivacidad'
export default {
    components: {
        TerminosYCondiciones,
        AvisoDePrivacidad
    },
    data () {
        return {
            aceptaTYC: false,
            aceptaAviso: false,
            dialogTYC: false,
            dialogAviso: false
        }
    },
    methods: {
        selected () {
            if(this.aceptaTYC && this.aceptaAviso){
                this.$emit('input', true)
            } else {
                this.$emit('input', false)
            }
        }
    }
}
</script>