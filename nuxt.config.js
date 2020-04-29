const siteInfo = {
  title: 'Zoom 自己紹介背景メーカー',
  description: 'Zoom のバーチャル背景に自己紹介文を入れてアピールできるツールです。オンライン商談時のアイスブレイクや、オンライン飲み会での話のきっかけなどに活用してください。'
}

export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: siteInfo.title,
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: siteInfo.description
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/basic.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~plugins/ga.js', mode: 'client' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    'nuxt-webfontloader'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  webfontloader: {
    google: {
      families: ['Lato:400,700', 'Noto+Sans+JP']
    }
  },
  generate: {
    fallback: true
  }
}
