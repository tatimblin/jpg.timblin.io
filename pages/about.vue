<template>
  <main class="Main" :style="`--brand-color: ${this.brandColor}`">
    <div class="Main-content">
      <h1 class="Main-hero">
        {{ hero }}
      </h1>
      
      <div class="Main-group">

        Hey

      </div>
    </div>
  </main>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
const client = createClient();

export default {
  layout: 'default',
  head () {
    return {
      title: this.aboutHead?.fields?.title,
      description: this.aboutHead?.fields?.description,
    };
  },
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
  &-content
  {
    margin: 20vh auto 80px;
    padding: 0 16px;

    @include query(small)
    {
      width: map-get($breakpoints, small);
    }

    @include query(large)
    {
      width: map-get($breakpoints, large);
    }
  }

	&-hero
	{
    @include lead;

    padding-bottom: 32px;
	}
}
</style>
