
const routes = [
  {
    path: '/',
    component: () => import('layouts/SimpleLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ],
    meta: { redirectAuth: true }
  },
  {
    path: '/registro',
    component: () => import('layouts/SimpleLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Registro.vue') }
    ],
    meta: { redirectAuth: true }
  },
  {
    path: '/tarjeta',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Tarjeta.vue'), meta: {title: 'Tu tarjeta'} }
    ],
    meta: { forAuth: true }
  },
  {
    path: '/promociones',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Promociones.vue'), meta: {title: 'Promociones'} }
    ],
    meta: { forAuth: false  }
  },
  {
    path: '/sucursales',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',component: () => import('pages/Sucursales.vue'), meta: {title: 'Sucursales'}}
    ],
    meta: { forAuth: false}
  },
  {
    path: '/beneficios',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',component: () => import('pages/Beneficios.vue'), meta: {title: 'Beneficios'}}
    ],
    meta: { forAuth: false}
  },
  {
    path: '/contacto',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',component: () => import('pages/Contacto.vue'), meta: {title: 'Contacto'}}
    ],
    meta: { forAuth: false}
  },
  {
    path: '/mi-cuenta',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/mi-cuenta.vue'), meta: {title: 'Mi cuenta'} }
    ],
    meta: { forAuth: true }
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
