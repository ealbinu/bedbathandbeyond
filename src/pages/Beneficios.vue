<template lang="pug">
  q-page(padding)
    q-carousel(v-model="carrusel" swipeable animated control-color="primary" transition-prev="slide-right" transition-next="slide-left" navigation infinite :autoplay="true" arrows).rounded-borders.full-height
      q-carousel-slide( :name="0"): q-card.q-py-xl: q-card-section
            lottie(:options="{animationData: animAcumula, loop: true}" )
            p Acumula Puntos #[strong.text-primary {{$appName}}] en todas las compras que realices en las sucursales.
      q-carousel-slide( :name="1"): q-card.q-py-xl: q-card-section
            lottie(:options="{animationData: animTienda, loop: true}" )
            p Acumula Puntos #[strong.text-primary {{$appName}}] en todas las compras que realices en la la tienda en línea.
      q-carousel-slide( :name="2"): q-card.q-py-xl: q-card-section
            lottie(:options="{animationData: animCanje, loop: true}" )
            p Utiliza tus Puntos #[strong.text-primary {{$appName}}] como forma de pago en tus compras en las sucursales y tienda en línea.
      q-carousel-slide( :name="3"): q-card.q-py-xl: q-card-section
            lottie(:options="{animationData: animPromo, loop: true}" )
            p Recibe #[strong.text-primary promociones especiales].
    </template>


<script>
import Lottie from 'vue-lottie';
import * as acumula from '../assets/beneficios_acumula.json'
// https://edit.lottiefiles.com/?src=https%3A%2F%2Fassets3.lottiefiles.com%2Fprivate_files%2Flf30_vh7hdsda.json
import * as tienda from '../assets/beneficios_tienda.json'
// https://edit.lottiefiles.com/?src=https%3A%2F%2Fassets1.lottiefiles.com%2Fprivate_files%2Flf30_9b8fzhnt.json
import * as canje from '../assets/beneficios_canje.json'
// https://edit.lottiefiles.com/?src=https%3A%2F%2Fassets10.lottiefiles.com%2Fprivate_files%2Flf30_jyflobv1.json
import * as promo from '../assets/beneficios_promo.json'
// https://edit.lottiefiles.com/?src=https%3A%2F%2Fassets6.lottiefiles.com%2Fprivate_files%2Flf30_acgke7jv.json


export default {
  name: 'Beneficios',
  components: {
    lottie: Lottie
  },
  data () {
    return {
      animAcumula: acumula.default,
      animTienda: tienda.default,
      animCanje: canje.default,
      animPromo: promo.default,
      carrusel: 0,
    }
  },
  computed: {
    
  },
  methods: {
    
  },
  mounted () {

  }
}
</script>
