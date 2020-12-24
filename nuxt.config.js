const glob  = require('glob');
const path = require('path');

const { createClient } = require('./plugins/contentful');
const cdaClient = createClient();
const cmaContentful = require('contentful-management');
const cmaClient = cmaContentful.createClient({
  space: process.env.NUXT_ENV_CTF_SPACE_ID,
  accessToken: process.env.NUXT_ENV_CTF_CMA_ACCESS_TOKEN
});

export default {
  publicRuntimeConfig: {
    postTypeID: process.env.NUXT_ENV_CTF_POST_TYPE_ID,
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Photography by Tris Timb',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Quickly browse through my photography, sorted into collections over the years.' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
    script: [
      { src: '/SplitText.min.js'},
    ]
  },
  css: [
    'assets/sass/global/main.scss'
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  router: {
    middleware: 'index'
  },
  generate: {
    routes () {
      return Promise.all([
        // get all blog posts
        cdaClient.getEntries({
          'content_type': process.env.NUXT_ENV_CTF_POST_TYPE_ID
        }),
        // get the blog post content type
        cmaClient.getSpace(process.env.NUXT_ENV_CTF_SPACE_ID)
          .then(space => space.getContentType(process.env.NUXT_ENV_CTF_POST_TYPE_ID))
      ])
      .then(([entries, postType]) => {
        return [
          // map entries to URLs
          ...entries.items.map(entry => `/${entry.fields.slug}`),
          // map all possible tags to URLs
          ...postType.fields.find(field => field.id === 'tags').items.validations[0].in.map(tag => `/tags/${tag}`)
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
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
