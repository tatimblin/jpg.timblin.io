
const contentful = require('contentful')

module.exports = {
  createClient () {
    return contentful.createClient({
      space: process.env.NUXT_ENV_CTF_SPACE_ID,
      accessToken: process.env.NUXT_ENV_CTF_CDA_ACCESS_TOKEN
    })
  }
}
