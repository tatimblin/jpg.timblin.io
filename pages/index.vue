<template>
  <main class="Main">
    <div class="Main-content">
      <h1 class="Main-hero">
        {{ hero }}
      </h1>
      <nuxt-link to="start">Start</nuxt-link>
      <ul class="Main-list" v-if="items.length">
        <li class="Main-item" v-for="item in items" :key="item.id">
          <nuxt-link :to="item.fields.slug">
            {{item.fields.title}}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
const client = createClient();

export default {
  layout: 'default',
  asyncData ({ $config: { postTypeID }}) {
    return client.getEntries({
      'content_type': 'homepage',
    })
      .then((entries) => {
        return client.getEntries({
          'content_type': postTypeID,
        })
          .then(({ items }) => {
            return {...entries.items[0].fields, items};
          })
          .catch(console.error);
      })
      .catch(console.error);
  },
};
</script>

<style lang="scss">
.Main
{
  &-content
  {
    margin: 80px auto;

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
	}

  &-list
  {
    padding: 32px 0;
  }

  &-item
  {
    @include sub;
  }
}
</style>
