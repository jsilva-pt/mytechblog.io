import theme from '@jsilva-pt/nuxt-content-theme-blog'

// const hostname = process.env.NUXT_ENV_URL2
//   ? `https://${process.env.NUXT_ENV_URL2}`
//   : 'http://localhost:3000'

export default theme({
  head: {
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/android-icon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/android-icon-16x16.png',
      },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
  i18n: {
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: require('./i18n/en-US'),
      },
    },
  },
})
