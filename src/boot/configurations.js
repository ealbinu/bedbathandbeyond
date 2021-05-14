
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
