import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Main from '@/views/Main.vue'
import axios from 'axios'
import { IP, PUERTO } from '../../backend/config/parametros'

Vue.use(VueRouter)

  const routes = [
    {
        path: '*',
        redirect: '/login'
    },
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/main',
        name: 'Main',
        component: Main,
        meta:{
            autentificado: true
        }
    }
 
  ]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) =>{
    (async () =>{
        let origen = localStorage.getItem('kat')
        
        if (origen == null) {
            
            var usuario = false
            
        }else{

            var tt = JSON.parse(origen)
           
            var data = await axios.get(`http://${IP}:${PUERTO}/api/login/sesion`, tt.token)

            var usuario = data.data.alive
        }

        let autorizado = to.matched.some(record => record.meta.autentificado)

        if (autorizado && !usuario) {
            next('login')
        }else if(!autorizado && usuario){
            next('Main')
        }else{
            next()
        }
    })()
})

export default router
