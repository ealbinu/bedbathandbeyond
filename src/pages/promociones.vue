<template lang="pug">
  q-page(padding)
    q-carousel(v-model="carrusel" animated control-color="primary" navigation infinite :autoplay="true" arrows).rounded-borders
      q-carousel-slide(v-for="(i, index) in items" :name="index" :key="index"  :img-src="i.url")
        p.text-h6 {{i.text}}
</template>


<script>
export default {
  name: 'Promociones',
  data () {
    return {
      carrusel: 0,
      items: [
        {
          url: 'https://source.unsplash.com/EoTUCbv9Jrs/960x800',
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
        },
        {
          url: 'https://source.unsplash.com/CbZ4EDP__VQ/960x800',
          text: 'Corporis eius doloremque laborum provident tempore quos.'
        },
      ]
    }
  }
}
</script>
