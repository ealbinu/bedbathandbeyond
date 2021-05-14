<template lang="pug">
  q-page(padding)
    .text-center.q-mt-xl: img(:alt="$appName" src="~assets/logo.svg" style="max-width: 40%")

    AgregarTarjeta(@tarjetaValida="cardData = $event" v-if="!cardData")
    template(v-else)
        TarjetaView(:card="cardData")
        RegistroForm(:card="cardData")


    div.text-center.q-mt-xl: q-btn(color="primary" label="Ya estoy registrado." type="submit" flat to="/" no-caps)
</template>

<script>
import AgregarTarjeta from 'components/registro/AgregarTarjeta'
import RegistroForm from 'components/registro/RegistroForm'
import TarjetaView from 'components/TarjetaView'

export default {
  name: 'Login',
  components: {
      AgregarTarjeta,
      RegistroForm,
      TarjetaView
  },
  data () {
      return {
          cardData: false
      }
  },
  methods: {
      tarjetaValida ($card) {
          this.cardData = $card
      }
  }
}
</script>
