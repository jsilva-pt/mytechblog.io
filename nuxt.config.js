const productionDomain = 'https://mytechblog.io'
const twitterUsername = 'jmanuelsilvapt'
const hostname = process.env.NUXT_ENV_URL2
  ? `https://${process.env.NUXT_ENV_URL2}`
  : 'http://localhost:3000'

const createSitemapRoutes = async () => {
  const routes = []
  const { $content } = require('@nuxt/content')

  let posts = []
  if (posts === null || posts.length === 0) {
    posts = await $content('', { deep: true })
      .where({
        isSerieIntroduction: { $ne: true },
        isArticle: { $ne: false },
      })
      .fetch()
  }

  for (const post of posts) {
    routes.push(`${post.slug}`)
  }
  return routes
}

const createFeedArticles = async function (feed) {
  feed.options = {
    title: 'MyTechBlog',
    description: 'Frontend development articles',
    link: hostname,
  }

  const { $content } = require('@nuxt/content')
  const articles = await $content('articles').fetch()

  articles.forEach((article) => {
    const url = `${hostname}/${article.slug}`
    feed.addItem({
      title: article.title,
      id: url,
      link: url,
      date: new Date(article.publishedTime),
      description: article.description,
      content: article.description,
      author: [{ name: 'José Silva' }],
    })
  })
}

export default {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    htmlAttrs: {
      lang: 'en',
    },
    title: process.env.npm_package_name || '',
    titleTemplate: '%s — MyTechBlog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // open graph
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'MyTechBlog' },
      {
        hid: 'og:image',
        property: 'og:image',
        content: `${productionDomain}/social.jpg`,
      },
      // twitter
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        hid: 'twitter:site',
        name: 'twitter:site',
        content: `@${twitterUsername}`,
      },
      {
        hid: 'twitter:creator',
        name: 'twitter:creator',
        content: `@${twitterUsername}`,
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: 'MyTechBlog',
        href: '/feed.xml',
      },
    ],
  },
  publicRuntimeConfig: {
    githubRepositoryUrl: 'https://github.com/jsilva-pt/mytechblog.io/',
    githubAccountUrl: 'https://github.com/jsilva-pt/',
    twitterAccountUrl: 'https://twitter.com/jmanuelsilvapt/',
    twitterUsername,
    linkedinAccountUrl: 'https://www.linkedin.com/in/jsilva-pt/',
    productionDomain,
    currentDomain: hostname,
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    'vue-social-sharing/nuxt',
    '@nuxt/content',
    '@nuxtjs/google-gtag',
    '@nuxtjs/feed',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
  ],

  'google-gtag': {
    id: process.env.NUXT_ENV_GA_ID,
  },

  feed: [
    {
      path: '/feed.xml',
      create: createFeedArticles,
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
      data: ['some', 'info'],
    },
  ],

  sitemap: {
    hostname,
    gzip: true,
    routes: createSitemapRoutes,
  },

  robots: {
    Sitemap: `${hostname}/sitemap.xml`,
  },

  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-material-oceanic.css',
      },
    },
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
}
