<template lang="pug">
q-page(padding)
  .row.column: .text-center.q-my-xl
    img(:alt="$appName" src="~assets/logo.svg").logo

  q-list(bordered).bg-grey-2.q-my-xl
    q-item(v-for="(i, index) in datosuser" v-if="user[i.field]" :key="index"): q-item-section
      q-item-label(caption) {{i.text}}
      q-item-label {{user[i.field]}}


  .row.column.q-my-lg
    q-btn(label="Términos y Condiciones" text-color="primary" flat no-caps @click="dialogTYC=true") 
    q-btn(label="Aviso de Privacidad" text-color="primary" flat  no-caps @click="dialogAviso=true").q-mt-md
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
  name: 'PageIndex',
  data () {
    return {
      dialogTYC: false,
      dialogAviso: false,
      datosuser: [
        {text: 'Correo', field: 'UserName'},
        {text: 'Tarjeta', field: 'CardID'},
        {text: 'Nombre', field: 'FirstName'},
        {text: 'Apellido paterno', field: 'LastName'},
        {text: 'Apellido materno', field: 'LastName2'},
        {text: 'Teléfono fijo', field: 'Phone'},
        {text: 'Teléfono móvil', field: 'CellPhone'},
        {text: 'Fecha de nacimiento', field: 'BirthDate'},
        {text: 'Género', field: 'Sex'},
      ]
    }
  },
  computed: {
    user () {
      return this.$store.getters['usuario/getuser']
    }
  },
}
</script>

<style lang="scss" scoped>
.logo{
  max-width: 60%;
}
</style>