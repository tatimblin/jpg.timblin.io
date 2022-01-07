<template>
  <main class="Main">
    <div class="Main-content">
      <h1 class="Main-hero">
        {{ hero }}
      </h1>
      <nuxt-link to="start">Start</nuxt-link>
    </div>
  </main>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
const client = createClient();

export default {
  layout: 'default',
  asyncData () {
    return client.getEntries({
      'content_type': 'homepage',
    })
      .then((entries) => entries.items[0].fields)
      .catch(console.error);
  },
};
</script>

<style lang="scss">
.Main
{
	&-hero
	{
    @include lead;
	}
}
</style>
