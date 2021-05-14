<template lang="pug">
q-layout(view="lhr lpr lfr")
  q-header.bg-white.text-primary
    q-toolbar
      q-btn(flat dense round icon="las la-bars" @click="menuDrawer=!menuDrawer")
      q-toolbar-title.text-body1.full-width.text-center {{pageTitle}}
      q-btn(flat dense round icon="las la-bell" @click="notificacionesDrawer=!notificacionesDrawer")
  
  q-drawer(v-model="menuDrawer" content-class="bg-primary"): menuContainer
    
  q-drawer(v-model="notificacionesDrawer" side="right" content-class="bg-primary")
    .flex.flex-center.full-height
      .text-white Sin notificaciones.

  //q-footer(class="bg-white")
    q-tabs(no-caps active-color="dark" indicator-color="secondary" class="text-primary" v-model="footertab")
      q-tab(name="inicio" label="Tarjeta" icon="las la-credit-card" stacked)
      q-tab(name="inicio" label="Promociones" icon="las la-gifts" stacked)
      q-tab(name="inicio" label="Sucursales" icon="las la-map-marked" stacked)
      q-tab(name="inicio" label="Mi cuenta" icon="las la-user" stacked)
  q-page-container: router-view/
</template>


<script>


import menuContainer from 'components/menuContainer'
export default {
  name: 'MainLayout',
  components: { 
    menuContainer
   },
  data () {
    return {
      menuDrawer: false,
      notificacionesDrawer: false,
      footertab: 'inicio',
      pageTitle: null,
    }
  },
  watch: {
    $route(to, from) {
      this.$set(this, 'pageTitle', this.$route.meta.title)
    }
  },
  mounted () {
    this.$set(this, 'pageTitle', this.$route.meta.title)
  }
}
</script>
