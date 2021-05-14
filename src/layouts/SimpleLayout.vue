<template lang="pug">
q-layout(view="lhr lpr lfr")
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
      footertab: 'inicio'
    }
  }
}
</script>
