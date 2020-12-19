import theme from '@jsilva-pt/nuxt-content-theme-blog'
import { footerLinks } from './blog.settings'

const baseUrl = 'https://mytechblog.io'

const publicRuntimeConfig = {
  baseUrl,

  githubOwner: 'jsilva-pt',
  githubRepository: 'mytechblog.io',
  githubMainBranch: 'main',

  twitterUsername: 'jmanuelsilvapt',
  linkedinUsername: 'jsilva-pt',

  showSocialIconsOnHeader: true,
  sharingBlogPostEnabled: true,
  sharingDefaultHashtags: ['MyTechBlog'],
  
  footerLinks
}

export default theme({
  feedOptions: {
    title: 'MyTechBlog',
    description: 'Frontend development articles',
    link: baseUrl,
  },
  publicRuntimeConfig,
  titleTemplate: '%s — MyTechBlog',
  pwa: {
    manifest: {
      short_name: 'MyTechBlog',
    },
    meta: {
      author: 'José Silva',
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
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
      },
    ],
    defaultLocale: 'en',
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
