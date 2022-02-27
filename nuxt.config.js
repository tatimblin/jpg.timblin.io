const glob  = require('glob');
const path = require('path');

const { createClient } = require('./plugins/contentful');
const contentfulClient = createClient({
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
  router: {
    middleware: 'index',
    trailingSlash: false,
  },
  generate: {
    routes () {
      return Promise.all([
        contentfulClient.getEntries({
          'content_type': process.env.NUXT_ENV_CTF_POST_TYPE_ID,
        }),
        contentfulClient.getEntries({
          'content_type': 'homepage',
        }),
      ])
        .then(([ posts, globals ]) => {
          return posts.items.map((post) => {
            return {
              route: `/${post.fields.slug}`,
              payload: {
                post,
                global: globals.items[0] ?? {},
              },
            };
          });
        });
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
