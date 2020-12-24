
const contentful = require('contentful')
const defaultConfig = {
  CTF_SPACE_ID: process.env.NUXT_ENV_CTF_SPACE_ID,
  CTF_CDA_ACCESS_TOKEN: process.env.NUXT_ENV_CTF_CDA_ACCESS_TOKEN
}

module.exports = {
  createClient (config = defaultConfig) {
    return contentful.createClient({
      space: config.CTF_SPACE_ID,
      accessToken: config.CTF_CDA_ACCESS_TOKEN
    })
  }
}