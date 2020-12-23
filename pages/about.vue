<template>
  <div>
    <!-- render blog posts -->
    <ul>
      <li v-for="post in posts" :key="post.fields.slug">
        {{ post.fields.title }}
      </li>
    </ul>
  </div>
</template>

<script>
  import {createClient} from '~/plugins/contentful.js'

  const client = createClient()

  export default {
    // `env` is available in the context object
    asyncData ({env}) {
      return Promise.all([
        // fetch all blog posts sorted by creation date
        client.getEntries({
          'content_type': env.CTF_BLOG_POST_TYPE_ID,
          order: '-sys.createdAt'
        })
      ]).then(([posts]) => {
        // return data that should be available
        // in the template
        return {
          posts: posts.items
        }
      }).catch(console.error)
    }
  }
</script>