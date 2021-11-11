<template lang="pug">
q-page(padding)
  q-pull-to-refresh(@refresh="loadItemsRefresh")
    .row.column: .text-center.q-my-xl
      img(:alt="$appName" src="~assets/logo.svg").logo

    
    q-list(bordered).bg-grey-2.q-my-xl(v-if="userinfo")
      q-item(): q-item-section
        q-item-label(caption) Correo electrónico
        q-item-label {{ user.LoginID }}
      
      q-item(v-for="(i, index) in datosuser" v-if="userinfo[i.field]" :key="index"): q-item-section
        q-item-label(caption) {{i.text}}
        q-item-label(v-if="i.field=='BirthDate'") {{ parseDate(userinfo[i.field]) }}
        q-item-label(v-else) {{userinfo[i.field]}}


    .row.column.q-my-lg
      q-btn(label="Términos y Condiciones" text-color="primary" flat no-caps @click="dialogTYC=true") 
      q-btn(label="Aviso de Privacidad" text-color="primary" flat  no-caps @click="dialogAviso=true").q-mt-md
      q-dialog(v-model="dialogTYC"): TerminosYCondiciones
      q-dialog(v-model="dialogAviso"): AvisoDePrivacidad
</template>


<script>
import TerminosYCondiciones from 'components/TerminosYCondiciones'
import AvisoDePrivacidad from 'components/AvisoDePrivacidad'
import { date } from 'quasar'
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
        {text: 'CódigoPostal', field: 'PostalCode'},
        {text: 'Estado', field: 'State'},
        {text: 'Count', field: 'Ciudad'},
        {text: 'Colonia', field: 'Suburb'},
      ]
    }
  },
  computed: {
    user () {
      return this.$store.getters['usuario/getuser']
    },
    userinfo () {
      return this.$store.getters['usuario/getuserinfo']
    },
  },
  methods: {
    parseDate (jsonDateString) {
        var dateP = parseInt(jsonDateString.replace('/Date(', ''))
        return date.formatDate(dateP, 'YYYY/MM/DD')
    },
    loadItemsRefresh (done) {
      var request = {
          UserName: this.user.UserName,
          Password: this.user.Password
      }
      this.$store.dispatch('usuario/login', request).then(res => {
        this.$store.dispatch('usuario/info', request).then(res => {
          //console.log('Info:',res)
          done()
        })
      })
    },
    loadItems () {
      var request = {
          UserName: this.user.UserName,
          Password: this.user.Password
      }
      this.$store.dispatch('usuario/login', request).then(res => {
        this.$store.dispatch('usuario/info', request).then(res => {
          //console.log('Info:',res)
        })
      })
    },
  },
  mounted () {

    this.loadItems()
    
  }
}
</script>

<style lang="scss" scoped>
.logo{
  max-width: 60%;
}
</style>