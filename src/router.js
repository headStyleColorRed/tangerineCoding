import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import template from './views/template.vue'
import editor from './views/editor.vue'
import test from './views/test.vue'
import almanaque from './views/almanaque.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/template',
      name: 'template',
      component: template
    },
    {
      path: '/editor',
      name: 'editor',
      component: editor
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/almanaque',
      name: 'almanaque',
      component: almanaque
    }
  ]
})
