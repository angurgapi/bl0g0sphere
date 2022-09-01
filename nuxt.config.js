const currentTime = new Date().getTime()

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  target: 'static', 
  head: {
    title: 'bl0g0sphere',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/main.scss', '@/assets/scss/modules/app.scss'],
  static: {
    prefix: false
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/global-components', '~/plugins/firebase'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/moment'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/svg-sprite', '@nuxtjs/axios'],

  svgSprite: {
    input: '~/assets/icons/'
  },
  moment: {
    defaultLocale: 'ru',
    locales: ['ru']
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    /*
     ** Run ESLint on save
     */

    postcss: null,
    filenames: {
      chunk: ({ isDev }) =>
        isDev ? `[name].${currentTime}.js` : `[contenthash].${currentTime}.js`,
      app: ({ isDev }) =>
        isDev ? `[name].${currentTime}.js` : `[contenthash].${currentTime}.js`
    },
    extend(config, { isDev, isClient }) {
      config.resolve.alias['vue'] = 'vue/dist/vue.common'
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
    }
  }
}
