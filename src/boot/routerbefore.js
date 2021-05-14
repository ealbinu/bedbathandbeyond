import { name } from '../../package.json'
export default ({ app, router, store, Vue }) => {
    router.beforeEach((to, from, next) => {
      
      
      // Is Authenticated
      var isAuth = !(localStorage.getItem(name+'_user') === null || store.getters.isauthenticated === false)

      if(isAuth){
        if (to.matched.some(record => record.meta.redirectAuth)) {
          next({
            path: '/tarjeta'
          })
        } else {
          next()
        }
      } else {
        if (to.matched.some(record => record.meta.forAuth)) {
          next({
            path: '/'
          })
        } else {
          next()
        }
      }

      
      /*
      if (to.matched.some(record => record.meta.forAuth)) {
        if (localStorage.getItem(name+'_user') === null || store.getters.isauthenticated === false) {
          next({
            path: '/login'
          })
        } else {
          next()
        }
      } else {
        next()
      }
      */

    })
}
