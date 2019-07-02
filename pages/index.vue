<template>
  <div class="container">
    <div>
      <h1 class="title">
        jpg.timblin.io
      </h1>
      <h2 class="subtitle">
        Photo Gallery
      </h2>
      <ul>
        <li v-for="post in posts" :key="post.date">
          <nuxt-link :to="post._path">
            {{ post.title }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'default',
  data() {
    // Using webpacks context to gather all files from a folder
    const context = require.context('~/content/collections/', false, /\.json$/);
    const posts = context.keys().map(key => ({
      ...context(key),
      _path: `/collection/${key.replace('.json', '').replace('./', '')}`
    })).sort(function(a, b) {
      var dateA = new Date(a.date), dateB = new Date(b.date);
      return dateA - dateB;
    });
    return { posts };
  }
};
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: $color;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
