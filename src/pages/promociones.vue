<template lang="pug">
  q-page(padding)
    q-carousel(v-model="carrusel" swipeable animated control-color="primary" transition-prev="slide-right" transition-next="slide-left" navigation infinite :autoplay="true" arrows).rounded-borders.full-height
      q-carousel-slide(v-for="(i, index) in promociones" :name="index" :key="index" :placeholder-src="'data:image/png;base64, '+$placeholderImg")
        q-img(:src="'data:image/png;base64, '+(i.Base64_Image||$placeholderImg)")
        div.q-mb-xl
          .text-h6.text-primary {{i.Description}}
          .text-body1 {{i.Description_Long}}
</template>


<script>
export default {
  name: 'Promociones',
  data () {
    return {
      carrusel: 0,
    }
  },
  computed: {
    user () {
      return this.$store.getters['usuario/getuser']
    },
    promociones () {
      return this.$store.getters['promociones/getlistado']
    },
  },
  methods: {
    loadItems () {
      var request= {
        "UserName": this.user.UserName || 'invitado',
        "Password": this.user.Password || 'invitado',
      }
      this.$store.dispatch('promociones/obtener', request).then(res => {
        this.$q.notify('Promociones cargadas')
      })
    }
  },
  mounted () {
    this.loadItems()
  }
}
</script>
