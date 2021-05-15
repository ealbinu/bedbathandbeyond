import Vue from 'vue'
import Vuex from 'vuex'


import usuario from './usuario'
import tarjeta from './tarjeta'
import utilidades from './utilidades'
import sucursales from './sucursales'
import promociones from './promociones'


Vue.use(Vuex)



export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      tarjeta,
      utilidades,
      usuario,
      sucursales,
      promociones
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
