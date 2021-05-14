<template lang="pug">
  q-page
    TarjetaView(:card="{card:user.CardID, type: (user.CardTypeId==5?'digital':'plastic')}")
    
    .row.bg-primary.q-mt-lg.text-center.text-white
      .col-12.q-py-lg
        .text-body1 Puntos
        .text-h4.text-bold {{user.BalancePoints}}
    
    Actividad

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
    loadTransactions () {

    }
  }
}
</script>
