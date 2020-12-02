import Vue from 'vue'

const globalComponents = {
  BaseAlert: () => import('../../node_modules/@jsilva-pt/nuxt-content-theme-blog/components/global/BaseAlert.vue' /* webpackChunkName: "components/global/BaseAlert" */).then(c => c.default || c),
  CodeBlock: () => import('../../node_modules/@jsilva-pt/nuxt-content-theme-blog/components/global/CodeBlock.vue' /* webpackChunkName: "components/global/CodeBlock" */).then(c => c.default || c),
  CodeGroup: () => import('../../node_modules/@jsilva-pt/nuxt-content-theme-blog/components/global/CodeGroup.vue' /* webpackChunkName: "components/global/CodeGroup" */).then(c => c.default || c),
  IconFacebook: () => import('../../node_modules/@jsilva-pt/nuxt-content-theme-blog/components/global/icons/IconFacebook.vue' /* webpackChunkName: "components/global/icons/IconFacebook" */).then(c => c.default || c),
  IconLinkedin: () => import('../../node_modules/@jsilva-pt/nuxt-content-theme-blog/components/global/icons/IconLinkedin.vue' /* webpackChunkName: "components/global/icons/IconLinkedin" */).then(c => c.default || c),
  IconTwitter: () => import('../../node_modules/@jsilva-pt/nuxt-content-theme-blog/components/global/icons/IconTwitter.vue' /* webpackChunkName: "components/global/icons/IconTwitter" */).then(c => c.default || c)
}

for (const name in globalComponents) {
  Vue.component(name, globalComponents[name])
}
