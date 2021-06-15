<template lang="pug">
  q-page(padding)
    q-card
      q-card-section.bg-primary.text-white.text-center
        .text-h6 {{$appName}}
      q-card-section.text-center
        .text-body1 está comprometido a servirte, por lo que te pedimos envíarnos tu duda, sugerencia o queja.
      
      q-separator.q-my-xs
      q-card-section.bg-white.text-center
        q-btn(color="primary" :label="$contactPhone" icon="las la-phone" v-bind="$btnAttr" type="a" :href="'tel:'+$contactPhone")
        .text-caption.q-mt-md Lunes a Viernes de 9:00am a 6:00pm (Hora del Centro de México), excepto días festivos.
      q-separator.q-my-xs
      q-card-section.bg-white.text-center
        q-btn(color="primary" :label="$contactMail" icon="las la-envelope" v-bind="$btnAttr" type="a" :href="'email:'+$contactMail")
      q-separator.q-my-xs
      q-card-section.bg-white.text-center
        q-btn(color="primary" :label="$whatsappPhone" icon="lab la-whatsapp" v-bind="$btnAttr" @click="openU('https://api.whatsapp.com/send?phone='+$whatsappPhone)").wabutton
        .text-caption.q-mt-md Tenemos a tu disposición el #[strong WhatsApp] de atención a socios de #[strong.text-primary {{$appName}}]. Escríbenos para que registres tus datos, consultes tu saldo en puntos o recuperes tu contraseña de acceso a tu cuenta.
        

</template>


<script>
import { openURL } from 'quasar'
export default {
  name: 'Beneficios',
  data () {
    return {
    }
  },
  computed: {
    
  },
  methods: {
    openU (url){
      openURL(url)
    }
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
.wabutton{
  background: #03E676 !important;
}
</style>