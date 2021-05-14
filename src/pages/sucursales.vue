<template lang="pug">
  q-page.flex
    gmaps-map(:options="mapOptions")
      //gmaps-marker(:position="{ lat: -27, lng: 153 }")
</template>



<script>
import { gmapsMap, gmapsMarker, gmaps } from 'x5-gmaps'
import { colors } from 'quasar'
export default {
  components: { gmapsMap, gmapsMarker },
  name: 'Sucursales',
  data () {
    return {
      mapOptions: {
        center: { lat: 19.4281997, lng: -99.129121 },
        zoom: 12,
        backgroundColor: colors.getBrand('primary'),
        disableDefaultUI: true
      }
    }
  },
  mounted() {
    gmaps().then((response) => {
      console.log(response)
    })
  }
}
</script>

<style lang="scss" scoped>
.gmaps-map{
  height: 70vh;
  width: 100%;
}
</style>