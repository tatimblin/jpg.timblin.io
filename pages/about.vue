<template>
  <main class="Main" :style="`--brand-color: ${this.brandColor}`">
    <div class="Main-content">
      <h1 class="Main-hero">
        {{ hero }}
      </h1>

      <a class="Main-cta" :href="`mailto:${email}`">
        {{ email }}
      </a>
      
      <div class="Main-group">

        <render-pdf :asset="resume" />

      </div>
    </div>
  </main>
</template>

<script>
import RenderPdf from '../components/RenderPDF';
import { createClient } from '~/plugins/contentful.js'
const client = createClient();

export default {
  layout: 'default',
  components: {
    RenderPdf,
  },
  head () {
    return {
      title: this.aboutHead?.fields?.title,
      description: this.aboutHead?.fields?.description,
    };
  },
  mounted () {
    this.$triggerNextPage(null);
  },
  asyncData () {
    return client.getEntries({
      'content_type': 'homepage',
    })
      .then((entries) => {
        console.log(entries.items[0]);
        return entries.items[0].fields;
      })
      .catch(console.error);
  },
};
</script>

<style lang="scss">
.Main
{
  &-content {
    margin: 20vh auto 80px;
    padding: 0 16px;

    @include query(small) {
      width: map-get($breakpoints, small);
    }

    @include query(large) {
      width: map-get($breakpoints, large);
    }
  }

	&-hero {
    @include lead;
	}

  &-cta {
    @include link;
    @include brow;

    display: inline-block;
    padding-bottom: 32px;
  }
}
</style>
