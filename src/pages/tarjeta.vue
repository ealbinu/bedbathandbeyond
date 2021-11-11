<template lang="pug">
  q-page
    q-pull-to-refresh(@refresh="loadItemsRefresh")
      TarjetaView(:card="{card:user.CardID, type: (user.CardTypeId==5?'digital':'plastic')}")
      
      .row.bg-primary.q-mt-lg.text-center.text-white
        .col-12.q-py-lg
          .text-body1 Puntos
          .text-h4.text-bold {{user.BalancePoints}}
      
    Actividad(ref="actividad")

</template>

<script>
import TarjetaView from 'components/TarjetaView'
import Actividad from 'components/Actividad'
export default {
  components: {
    TarjetaView,
    Actividad
  },
  data () {
    return {

    }
  },
  computed: {
    user () {
      return this.$store.getters['usuario/getuser']
    }
  },
  methods: {
    loadItems () {
      var request = {
          UserName: this.user.UserName,
          Password: this.user.Password
      }
      this.$store.dispatch('usuario/login', request).then(res => {
        console.log('Login:',res)
      })
    },
    loadItemsRefresh(done){
      var request = {
          UserName: this.user.UserName,
          Password: this.user.Password
      }
      this.$store.dispatch('usuario/login', request).then(res => {
        this.$store.dispatch('usuario/info', request).then(res => {
          //console.log('Info:',res)
          this.$refs.actividad.loadItems()
          done()
        })
      })
    }
  },
  mounted () {
    this.loadItems()
  }
}
</script>
