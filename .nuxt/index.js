import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '../node_modules/@jsilva-pt/nuxt-content-theme-blog/layouts/error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_plugin_51a0769d from 'nuxt_plugin_plugin_51a0769d' // Source: ./components/plugin.js (mode: 'all')
import nuxt_plugin_pluginclient_169bab99 from 'nuxt_plugin_pluginclient_169bab99' // Source: ./content/plugin.client.js (mode: 'client')
import nuxt_plugin_pluginserver_7c551d21 from 'nuxt_plugin_pluginserver_7c551d21' // Source: ./content/plugin.server.js (mode: 'server')
import nuxt_plugin_pluginrouting_46d7ee9a from 'nuxt_plugin_pluginrouting_46d7ee9a' // Source: ./nuxt-i18n/plugin.routing.js (mode: 'all')
import nuxt_plugin_pluginmain_49d1d79c from 'nuxt_plugin_pluginmain_49d1d79c' // Source: ./nuxt-i18n/plugin.main.js (mode: 'all')
import nuxt_plugin_vuesocialsharingplugin_54cb88ac from 'nuxt_plugin_vuesocialsharingplugin_54cb88ac' // Source: ./vue-social-sharing-plugin.js (mode: 'all')
import nuxt_plugin_workbox_549dd98f from 'nuxt_plugin_workbox_549dd98f' // Source: ./workbox.js (mode: 'client')
import nuxt_plugin_metaplugin_056fbcbc from 'nuxt_plugin_metaplugin_056fbcbc' // Source: ./pwa/meta.plugin.js (mode: 'all')
import nuxt_plugin_iconplugin_01efc716 from 'nuxt_plugin_iconplugin_01efc716' // Source: ./pwa/icon.plugin.js (mode: 'all')
import nuxt_plugin_pluginserver_2fc733ae from 'nuxt_plugin_pluginserver_2fc733ae' // Source: ./color-mode/plugin.server.js (mode: 'server')
import nuxt_plugin_pluginclient_fb3a16be from 'nuxt_plugin_pluginclient_fb3a16be' // Source: ./color-mode/plugin.client.js (mode: 'client')
import nuxt_plugin_init_5aefaeb1 from 'nuxt_plugin_init_5aefaeb1' // Source: ../node_modules/@jsilva-pt/nuxt-content-theme-blog/plugins/init.js (mode: 'all')
import nuxt_plugin_vueobservevisibility_66676af7 from 'nuxt_plugin_vueobservevisibility_66676af7' // Source: ../node_modules/@jsilva-pt/nuxt-content-theme-blog/plugins/vue-observe-visibility.js (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    return this.$root.$options.$nuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

const originalRegisterModule = Vuex.Store.prototype.registerModule
const baseStoreOptions = { preserveState: process.client }

function registerModule (path, rawModule, options = {}) {
  return originalRegisterModule.call(this, path, rawModule, { ...baseStoreOptions, ...options })
}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141
  store.registerModule = registerModule

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"app","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"}],"bodyAttrs":{"class":["font-sans font-medium bg-light-surface dark:bg-dark-surface text-light-onSurfacePrimary dark:text-dark-onSurfacePrimary transition-colors duration-300 ease-linear"]},"link":[{"rel":"apple-touch-icon","sizes":"180x180","href":"\u002Fapple-touch-icon.png"},{"rel":"icon","type":"image\u002Fpng","sizes":"32x32","href":"\u002Fandroid-icon-32x32.png"},{"rel":"icon","type":"image\u002Fpng","sizes":"16x16","href":"\u002Fandroid-icon-16x16.png"},{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"}],"style":[],"script":[{"hid":"nuxt-color-mode-script","innerHTML":"!function (){\"use strict\";var e=window,s=document,o=s.documentElement,a=[\"dark\",\"light\"],t=window.localStorage.getItem(\"nuxt-color-mode\")||\"light\",c=\"system\"===t?l():t,i=s.body.getAttribute(\"data-color-mode-forced\");function r(e){var s=\"\"+e+\"-mode\";o.classList?o.classList.add(s):o.className+=\" \"+s}function n(s){return e.matchMedia(\"(prefers-color-scheme\"+s+\")\")}function l(){if(e.matchMedia&&\"not all\"!==n(\"\").media)for(var s of a)if(n(\":\"+s).matches)return s;return\"light\"}i&&(c=i),r(c),e[\"__NUXT_COLOR_MODE__\"]={preference:t,value:c,getColorScheme:l,addClass:r,removeClass:function(e){var s=\"\"+e+\"-mode\";o.classList?o.classList.remove(s):o.className=o.className.replace(new RegExp(s,\"g\"),\"\")}}}();\n","pbody":true}],"__dangerouslyDisableSanitizersByTagID":{"nuxt-color-mode-script":["innerHTML"]}},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_plugin_51a0769d === 'function') {
    await nuxt_plugin_plugin_51a0769d(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_pluginclient_169bab99 === 'function') {
    await nuxt_plugin_pluginclient_169bab99(app.context, inject)
  }

  if (process.server && typeof nuxt_plugin_pluginserver_7c551d21 === 'function') {
    await nuxt_plugin_pluginserver_7c551d21(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginrouting_46d7ee9a === 'function') {
    await nuxt_plugin_pluginrouting_46d7ee9a(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginmain_49d1d79c === 'function') {
    await nuxt_plugin_pluginmain_49d1d79c(app.context, inject)
  }

  if (typeof nuxt_plugin_vuesocialsharingplugin_54cb88ac === 'function') {
    await nuxt_plugin_vuesocialsharingplugin_54cb88ac(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_workbox_549dd98f === 'function') {
    await nuxt_plugin_workbox_549dd98f(app.context, inject)
  }

  if (typeof nuxt_plugin_metaplugin_056fbcbc === 'function') {
    await nuxt_plugin_metaplugin_056fbcbc(app.context, inject)
  }

  if (typeof nuxt_plugin_iconplugin_01efc716 === 'function') {
    await nuxt_plugin_iconplugin_01efc716(app.context, inject)
  }

  if (process.server && typeof nuxt_plugin_pluginserver_2fc733ae === 'function') {
    await nuxt_plugin_pluginserver_2fc733ae(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_pluginclient_fb3a16be === 'function') {
    await nuxt_plugin_pluginclient_fb3a16be(app.context, inject)
  }

  if (typeof nuxt_plugin_init_5aefaeb1 === 'function') {
    await nuxt_plugin_init_5aefaeb1(app.context, inject)
  }

  if (typeof nuxt_plugin_vueobservevisibility_66676af7 === 'function') {
    await nuxt_plugin_vueobservevisibility_66676af7(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, (err) => {
        // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
        if (!err._isRouter) return reject(err)
        if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
