<template lang="pug">
  q-page.flex
    gmaps-map(:options="mapOptions" ref="map")
      gmaps-marker( v-for="(i, index) in sucursales" :position="{ lat: i.Lat, lng: i.Lng }" :key="index" :options="markeroptions" @click="markclick(i)")
      q-dialog(position="bottom" v-model="dialog" v-if="dialog && activemarker")
        q-card.q-ma-sm
          q-toolbar.bg-primary.text-white
            q-toolbar-title {{activemarker.Description}}
            q-btn(flat icon="las la-times" @click="dialog=false")
          q-card-section
            .text-body2 {{activemarker.Address}}
            .text-body2.text-grey {{activemarker.Estado}}
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
        zoom: 4,
        backgroundColor: colors.getBrand('primary'),
        disableDefaultUI: true
      },
      markeroptions: {
        icon: require('assets/marker.png')
      },
      dialog: false,
      activemarker: null
    }
  },
  computed: {
    user () {
      return this.$store.getters['usuario/getuser']
    },
    sucursales () {
      return this.$store.getters['sucursales/getlistado']
    }
  },
  methods: {
    markclick(item){
      this.dialog = true
      this.activemarker = item
      this.mapOptions.center= { lat: item.Lat, lng: item.Lng }
      this.mapOptions.zoom= 12
    },
    loadItems () {
      var request= {
        "UserName": this.user.UserName || 'invitado',
        "Active": "1",
        "StateID": "0"
      }
      this.$store.dispatch('sucursales/obtener', request).then(res => {
        this.$q.notify('Sucursales cargadas')
      })
    }
  },
  mounted() {
    gmaps().then((response) => {

    })

    this.loadItems()

  }
}
</script>

<style lang="scss" scoped>
.gmaps-map{
  height: calc(100vh - 50px);
  width: 100%;
}
</style>