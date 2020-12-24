<template>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
const client = createClient()

export default {
  layout: 'default',
  asyncData({ $config: { postTypeID }, app: { router } }) {
    const slug = client.getEntries({
      'content_type': postTypeID,
      'order': '-fields.date',
      'limit': 1,
    })
    .then(entries => {
      router.push(entries.items[0].fields.slug)
    })
  },
};
</script>
