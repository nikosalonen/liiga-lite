export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'liiga-lite',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/http.js'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,
  target: 'static',
  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',

    '@nuxtjs/google-fonts',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxt/http',
    '@nuxtjs/proxy',
  ],
  http: {
    proxy: true, // Can be also an object with default options
    serverTimeout: 10000,
    https: true,
  },

  proxy: {
    '/api/': {
      target: 'https://liiga.fi/api/v1',
      pathRewrite: { '^/api': '' },
    },
  },
  tailwindcss: {
    configPath: 'tailwind.config.js',
  },

  googleFonts: {
    display: 'block',
    download: true,
    overwriting: false,
    base64: true,
    fontsPath: '~assets/fonts',
    families: {
      Saira: true,
    },
  },
  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
