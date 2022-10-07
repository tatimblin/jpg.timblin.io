<template>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
const client = createClient();

export default {
  layout: 'default',
  mounted() {
    const postTypeID = this.$config.postTypeID;
    client.getEntries({
      'content_type': postTypeID,
      'order': '-fields.order,-fields.date',
      'limit': 1,
    })
      .then(entries => this.$router.replace(entries.items[0].fields.slug));
  },
};
</script>
