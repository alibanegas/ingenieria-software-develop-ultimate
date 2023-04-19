import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    alias: '/'
  },
  {
    path: '/inventario/:rol/:sucursalcode',
    name: 'inventario',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/inventarioView.vue')
    }
  },
  {
    path: '/restablecerContrasenia',
    name: 'restablecerContrasenia',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/restablecerContraseniaView.vue')
    }
  },
  {
    path: '/empleados',
    name: 'empleados',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/empleadosView.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//Validamos que exista un token creado para poder ingresar a la web
const validarToken = () => {
  return sessionStorage.getItem('token')
}

//Realiza la validación de la ruta a la que se quiere ingresar y si existe o no un toke, si no existe un token y la ruta no es el inicio de sesión, se hace la redirreción al inicio de sesión
router.beforeEach((to, from, next) => {
  if ((to.path !== '/login' && to.path !== '/' && to.path !=='/restablecerContrasenia') && !validarToken()) next({ name: 'Login'})
  else next()
})

export default router
