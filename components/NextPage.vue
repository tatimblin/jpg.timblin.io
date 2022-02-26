<template>
  <div class="NextPage"></div>
</template>

<script>
  import { createClient } from '~/plugins/contentful.js';
  const client = createClient();

  export default {
    props: {
      at: {
        type: String,
      },
      ready: {
        type: Boolean,
        default: false,
      },
    },
    mounted () {
      const postTypeID = this.$config.postTypeID;
      this.$triggerNextPage(() =>  {
        client.getEntries({
          'content_type': postTypeID,
          'order': '-fields.date',
          'fields.date[lt]': this.at,
          'limit': 1,
        })
        .then(entries => {
          if (entries.total === 0) {
            return client.getEntries({
              'content_type': postTypeID,
              'order': '-fields.date',
              'limit': 1,
            }).then(first => {
              return first;
            });
          }
          return entries;
        })
        .then(entries => {
          const slug = entries?.items[0]?.fields?.slug || '/';
          if (this.ready) this.$router.push(slug);
        });
      });
    },
  };
</script>

<style lang="scss">
  .NextPage
  {
    position: relative;
    height: 100vh;
    background: rgb(255,255,255);
    background: linear-gradient(0deg, rgba(255,255,255,1) 85%, rgba(255,255,255,0) 100%);
    z-index: 1;
  }
</style>
