import Vue from 'vue'
import vueCrypt from 'vue-crypt'
export default async ({Vue}) => {
    Vue.use(vueCrypt)
    this.$aes.setKey('go')
}
