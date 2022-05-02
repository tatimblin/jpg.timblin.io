<template>
  <main class="Main" :style="`--brand-color: ${this.brandColor}`">
    <div class="Main-content">
      <h1 v-if="hero" class="Main-hero">
        {{ hero }}
      </h1>
      
      <div v-if="items">
        <div class="Main-group" v-for="(list, index) in groupByProperty(items, 'group')" :key="index">

          <h2 class="Main-label">
            {{index}}
          </h2>

          <ul class="Main-list">
            <li class="Main-item" v-for="item in list" :key="item.id">
              <nuxt-link class="Main-link" :to="item.fields.slug">
                {{item.fields.title}}
              </nuxt-link>
            </li>
          </ul>

        </div>
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
      title: this.head?.fields?.title,
      description: this.head?.fields?.description,
    };
  },
  mounted () {
    this.$triggerNextPage(null);
    if (this.url) this.$router.replace(this.url);
  },
  asyncData ({ $config: { postTypeID }}) {
    return client.getEntries({
      'content_type': 'homepage',
    })
      .then((entries) => {
        return client.getEntries({
          'content_type': postTypeID,
          'order': '-fields.date',
        })
          .then(({ items }) => {
            return {
              ...entries.items[0].fields,
              items
            };
          })
          .catch(console.error);
      })
      .catch(() => {
        return client.getEntries({
          'content_type': postTypeID,
          'order': '-fields.date',
          'limit': 1,
        })
          .then((entries) => {
            return {
              hero: '',
              brandColor: '#000',
              items: [],
              url: entries.items[0].fields.slug,
            }
          });
      });
  },
  methods: {
    groupByProperty: (array = [], property) => {
      const groups = {};
      array.forEach((item) => {
        const qualifier = item.fields[property];
        if (groups[qualifier]) groups[qualifier].push(item);
        else groups[qualifier] = [item];
      });
      return groups;
    },
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

  &-hero,
  &-group,
  &-list
  {
    padding-bottom: 32px;
  }

	&-hero
	{
    @include lead;
	}

  &-label
  {
    @include brow;
  }

  &-item
  {
    @include sub;
  }

  &-link
  {
    color: var(--brand-color);
    text-decoration: none;
    margin: 0 -10px;
    padding: 0 10px;
    // animated underline
    background-image: linear-gradient(currentColor, currentColor);
    background-position: 0 55%;
    background-repeat: no-repeat;
    background-size: 0 2px;
    transition: background-size .3s;

    &:hover,
    &:focus
    {
      background-size: 100% 2px;
    }
  }
}
</style>
