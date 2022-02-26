const glob  = require('glob');
const path = require('path');

const { createClient } = require('./plugins/contentful');
const cdaClient = createClient({
  space: process.env.NUXT_ENV_CTF_SPACE_ID,
  accessToken: process.env.NUXT_ENV_CTF_CDA_ACCESS_TOKEN,
});

export default {
  target: 'static',
  publicRuntimeConfig: {
    postTypeID: process.env.NUXT_ENV_CTF_POST_TYPE_ID,
  },
  privateRuntimeConfig: {
    space: process.env.NUXT_ENV_CTF_SPACE_ID,
    accessToken: process.env.NUXT_ENV_CTF_CDA_ACCESS_TOKEN,
  },
  /*
  ** Headers of the page
  */
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [{ src: '/SplitText.min.js'}]
  },
  css: ['assets/sass/global/main.scss'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  router: {
    middleware: 'index',
    trailingSlash: false,
  },
  generate: {
    routes () {
      return Promise.all([
        // get all blog posts
        cdaClient.getEntries({
          'content_type': process.env.NUXT_ENV_CTF_POST_TYPE_ID
        }),
      ])
      .then(([ entries ]) => {
        return [
          // map entries to URLs
          ...entries.items.map(entry => `/${entry.fields.slug}`)
        ]
      })
    }
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/next-page.client.js'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    scss: [
      './assets/sass/include.scss',
    ],
  }
}
