import Vue from 'vue'
import store from './index'
import Router from 'vue-router'
import login from '../components/login/login'
import home from '../components/home/home'
import HelloWorld from '../components/HelloWorld'


Vue.use(Router)

const ifNoAutenticado = (to, from, next) => {
    if(!store.getters.isAutenticado) {
        next()
        return
    } 
    next('/home')

}



const ifAutenticado = (to, from, next) => {
    console.log()
    if (store.getters.isAutenticado) {
        next()
        return
    }
    next('/login')
} 

const ifRaizAutenticado = (to, from, next) => {
    console.log()
    if (!store.getters.isAutenticado) {
        next()
        return
    }
    next('/home')
} 

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: login,
            beforeEnter: ifNoAutenticado
        },
        {
            path: '/home',
            name: 'Home',
            component: home,
            beforeEnter: ifAutenticado
        },
        {
            path: '/',
            name: 'Inicio',
            component: HelloWorld,
            beforeEnter: ifRaizAutenticado
        },
    ],
})