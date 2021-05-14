<template lang="pug">
section.text-white.q-pa-lg.text-center.q-pb-xl
    .tarjeta.q-mx-auto
        //.text-right: q-btn(label="Reverso" icon-right="fas fa-sync-alt" color="primary" rounded size="xs" @click="changeCardView()")
        q-card.frente.bg-primary.shadow-10.flex.flex-center(:class="cardview ? 'cardview' : '' " @click.native="changeCardView()")
            img(src="~assets/logo-inv.svg").yzalogocard
            .isdigital.q-mt-lg(v-if="card.type=='digital'") TARJETA DIGITAL
        q-card.atras.bg-white.shadow-10.flex.flex-center(:class="cardview ? 'cardview' : '' " @click.native="changeCardView()")
            div.full-width.q-mb-lg: div.bg-dark.q-pa-sm.q-py-lg.q-mt-md.text-white.text-center.text-caption
            barcode(:value="card.card" tag="svg" :options="{lineColor: '#222', height: 60}").q-mx-auto
            .text-center.text-h6.text-primary
                //div {{user.FirstName}} {{user.LastName}}
</template>
<script>
import VueBarcode from '@chenfengyuan/vue-barcode'
export default {
    props: ['card'],
    data () {
        return {
            cardview: false
        }
    },
    components: {
        'barcode': VueBarcode,
    },
    methods: {
        changeCardView () {
            this.cardview = !this.cardview
        }
    },
}
</script>

<style lang="scss" scoped>
.tarjeta{
    max-width: 420px;
    min-height: 200px;
    position: relative;
    .frente, .atras{
      border-radius: 6px;
      border: 1px solid #fff;
      min-height: 220px;
      display: flex;
      flex-direction: column;
    }
    .frente{
      position: absolute;
      width:100%;
      top: 30px;
      left: -10px;
      animation-duration: 1s;
      animation-name: cardviewBack;
      animation-fill-mode: forwards;
      &.cardview{
        animation-duration: 1s;
        animation-name: cardviewFront;
        animation-fill-mode: forwards;
      }
    }
    .atras {
      position: absolute;
      width:100%;
      top: 0px;
      right: -10px;
      z-index: 0;
      animation-duration: 1s;
      animation-name: cardviewBack2;
      &.cardview{
        animation-duration: 1s;
        animation-name: cardviewFront2;
      }
    }
    .yzalogocard{
      height: 60px;
    }
  }
  @keyframes cardviewBack {
    0% { left: -10px; z-index: 0;  }
    50% { left: -250px; z-index: 0; transform: rotateZ(-25deg); }
    51% { z-index: 1; }
    100% { left: -10px; z-index: 1; }
  }
  @keyframes cardviewFront {
    0% { left: -10px; z-index: 1; }
    50% { left: -250px; z-index: 1; transform: rotateZ(-25deg); }
    51% { z-index: 0; }
    100% { left: -10px; z-index: 0;  }
  }
  @keyframes cardviewBack2 {
    0% { right: -10px; }
    50% { right: -250px; transform: rotateZ(25deg); }
    100% { right: -10px;  }
  }
  @keyframes cardviewFront2 {
    0% { right: -10px; }
    50% { right: -250px; transform: rotateZ(25deg); }
    100% { right: -10px;  }
  }
</style>