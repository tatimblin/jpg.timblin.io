<template>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
const client = createClient()

export default {
  layout: 'default',
  mounted() {
    const slug = client.getEntries({
      'content_type': 'collection',
      'order': '-fields.date',
      'limit': 1,
    })
    .then(entries => {
      this.$router.push(entries.items[0].fields.slug)
    })
  },
};
</script>
