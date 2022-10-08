<template>
  <main class="Main" :style="`--brand-color: ${this.brandColor}`">
    <div class="Main-content">
      <h1 v-if="hero" class="Main-hero">
        {{ hero }}
      </h1>

      <div class="Main-ctaWrapper">
        <a v-if="email" class="Main-cta" :href="`mailto:${email}`">
          {{ email }}
        </a>

        <a v-if="website" class="Main-cta" :href="website">
          {{ website }}
        </a>
      </div>
      
      <div class="Main-group Main-body">
        <rich-text-renderer :document="about" />
      </div>

      <div class="Main-group">
        <render-pdf v-if="resume" :asset="resume" />
      </div>
    </div>
  </main>
</template>

<script>
import RichTextRenderer from 'contentful-rich-text-vue-renderer';
import RenderPdf from '../components/RenderPDF';
import { createClient } from '~/plugins/contentful.js'
const client = createClient();

export default {
  layout: 'default',
  components: {
    RenderPdf,
    RichTextRenderer,
  },
  head () {
    return {
      title: this.aboutHead?.fields?.title,
      description: this.aboutHead?.fields?.description,
    };
  },
  data() {
    return {
      email: '',
      hero: '',
      resume: '',
      website: '',
      about: {},
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
        console.log(entries.items[0].fields);
        return entries.items[0].fields;
      })
      .catch(() => {});
  },
};
</script>

<style lang="scss">
.Main
{
  &-content {
    margin: 20vh auto 80px;
    padding: 0 calc(#{$spacing} / 2);

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

  &-ctaWrapper {
    display: flex;
    flex-direction: column;
    padding-bottom: $spacing;
  }

  &-cta {
    @include link;
    @include brow;

    display: block;
    margin-bottom: $spacing;
  }

  &-body {
    @include body;
  }
}
</style>
