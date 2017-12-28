import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from "./components/App.vue"
import Login from "./components/Login.vue"

Vue.use(VueRouter);
Vue.use(VueResource);

var routes = [];
var wrapperRoutes = [];

wrapperRoutes.push({ path: '/login', name: 'Login', component: Login });

var appRouter = {path: '/app', component: App, children: routes, name: 'App', redirect: '/app/visao-geral'};

wrapperRoutes.push(appRouter);
wrapperRoutes.push({ path: '/', redirect: '/app' });

var router = new VueRouter({
    routes: wrapperRoutes,
    linkActiveClass: 'is-active',
    linkExactActiveClass: 'is-active'
});

new Vue({el: '#app', router})
