import theme from '@jsilva-pt/nuxt-content-theme-blog'

const baseUrl = 'https://mytechblog.io'

export default theme({
  publicRuntimeConfig: {
    baseUrl
  },
  titleTemplate: '%s — MyTechBlog',
  pwa: {
    meta: {
      name: 'MyTechBlog',
      author: 'José Silva',
      theme_color: '#2C3E50',
      ogHost: baseUrl,
      twitterCard: 'summary_large_image',
      twitterSite: 'jmanuelsilvapt',
      twitterCreator: 'jmanuelsilvapt'
    }
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
})
