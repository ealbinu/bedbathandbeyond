
import { name, productName, version } from '../../package.json'

import { uid } from 'quasar'

import crypt from 'boot/crypt'

export default async ({ app, router, Vue, store}) => {

  // El Nombre y Version viene de package.json en root */
  Vue.prototype.$appidName = name
  Vue.prototype.$appName = productName
  Vue.prototype.$appVersion = version
  Vue.prototype.$GoogleMapsApiKey = 'AIzaSyBZ47-1LV7EYv29o3qOBFy-M18FvILyYyk'
  
  // Estilos de botón
  // https://quasar.dev/vue-components/button#qbtn-api > STYLE
  Vue.prototype.$btnAttr = {
    outline: false,
    flat: false,
    unelevated: true,
    rounded: false,
    push: false,
    glossy: false,
    fab: false,
    fabMini: false,
    noCaps: true
  }
  
  // Estilos de input
  // https://quasar.dev/vue-components/input#qinput-api > STYLE
  Vue.prototype.$inputAttr = {
    filled: false,
    outlined: true,
    borderless: false,
    dark: false,
    rounded: false,
    square: false,
    dense: true,
    standout: ""
  }

  Vue.prototype.$placeholderImg = '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'
  
  //Obtener timezone utc
  var timezone = Number(-new Date().getTimezoneOffset()/60)
  Vue.prototype.$timezone = timezone
  Vue.prototype.$timezoneb64 = window.btoa(timezone)
 
  // Generar un UID por dispositivo.
  if(!store.getters['usuario/getuid']){
    const theuid = uid()
    store.dispatch('usuario/newuid', theuid)
    console.warn('UID no encontrado. Generando: ', theuid)
  }


}
