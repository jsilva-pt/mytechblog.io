import theme from '@jsilva-pt/nuxt-content-theme-blog'

const baseUrl = 'https://mytechblog.io'
const blogAuthor = 'José Silva'

export default theme({
  feedOptions: {
    title: 'MyTechBlog',
    description: 'Frontend development articles',
    link: baseUrl,
  },
  publicRuntimeConfig: {
    baseUrl
  },
  titleTemplate: '%s — MyTechBlog',
  pwa: {
    manifest: {
      short_name: 'MyTechBlog',
    },
    meta: {
      name: 'MyTechBlog',
      author: blogAuthor,
      theme_color: '#2C3E50',
      ogHost: baseUrl,
      twitterCard: 'summary_large_image',
      twitterSite: 'jmanuelsilvapt',
      twitterCreator: 'jmanuelsilvapt'
    }
  },
  colorMode: {
    preference: 'dark',
  },
  i18n: {
    baseUrl,
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: require('./i18n/en-US'),
      },
    },
  },

  modules: [
    '@nuxtjs/google-gtag'
  ],

  'google-gtag': {
    id: process.env.NUXT_ENV_GA_ID,
  },
})
