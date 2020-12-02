import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3b4b5574 = () => interopDefault(import('../node_modules/@nuxtjs/tailwindcss/lib/ui/pages/index.vue' /* webpackChunkName: "" */))
const _33d26950 = () => interopDefault(import('../node_modules/@jsilva-pt/nuxt-content-theme-blog/pages/index.vue' /* webpackChunkName: "pages/index" */))
const _321bc808 = () => interopDefault(import('../node_modules/@jsilva-pt/nuxt-content-theme-blog/pages/_slug.vue' /* webpackChunkName: "pages/_slug" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/_tailwind",
    component: _3b4b5574,
    name: "_tailwind"
  }, {
    path: "/",
    component: _33d26950,
    name: "index___en"
  }, {
    path: "/:slug",
    component: _321bc808,
    name: "slug___en"
  }],

  fallback: false
}

export function createRouter () {
  const router = new Router(routerOptions)
  const resolve = router.resolve.bind(router)

  // encodeURI(decodeURI()) ~> support both encoded and non-encoded urls
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = encodeURI(decodeURI(to))
    }
    return resolve(to, current, append)
  }

  return router
}
