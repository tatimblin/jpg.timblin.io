<template>
  <main class="Collection" v-if="post">
    <div class="Collection-hero">
      <intro-section v-if="post.fields" v-bind="post.fields" ref="textContent" />
    </div>

    <transition v-bind:css="false" @enter="enter" appear>
      <div class="Collection-images">
        <image-gallery :gallery="post.fields.gallery" />
      </div>
    </transition>

    <next-page :at="post.fields.date" :ready="isPageLoaded" />
  </main>
</template>

<script>
import { createClient } from '~/plugins/contentful.js';
import { gsap, Power3 } from 'gsap';
import IntroSection from '~/components/Collection/IntroSection';
import ImageGallery from '~/components/Collection/ImageGallery';
import NextPage from '~/components/NextPage';

const client = createClient();

export default {
  layout: 'default',
  components: {
    IntroSection,
    ImageGallery,
    NextPage,
  },
  head () {
    console.log(this.post);
    return {
      title: this.post.fields.title,
      description: this.post.fields.description,
      meta: [
        { hid: 'og:image', property: 'og:image', content: `${this.post.fields.gallery[0].fields.file.url}?fit=fill&w=400&h=300&fm=jpg` },
        { hid: 'og:image:width', property: 'og:image:width', content: '400' },
        { hid: 'og:image:height', property: 'og:image:height', content: '300' },
        { hid: 'og:image:type', property: 'og:image:type', content: 'image/jpeg' },
      ],
    };
  },
  data() {
    return {
      isPageLoaded: false,
    };
  },
  asyncData ({ $config, params, payload }) {
    // `payload` passes the data for each post from the
    // nuxt.config.js request to get the slug. It is only
    // available in prod (nuxt start), so fallback to recreating
    // the request for dev.
    if (payload) return payload;
    else return Promise.allSettled([
      client.getEntries({
        'content_type': $config.postTypeID,
        'fields.slug': params.slug,
      }),
      client.getEntries({
        'content_type': 'homepage',
      }),
    ])
      .then(([ posts, globals ]) => {
        return {
          post: posts.value?.items?.length ? posts.value.items[0] : null,
          global: globals.value?.items?.length ? globals.value.items[0] : null,
        }
      })
      .catch(() => {});
  },
  mounted() {
    const isGreaterThanViewport = this.$refs.textContent.$el.clientHeight > window.innerHeight;
    if (isGreaterThanViewport) this.heroClass += ` ${this.heroClass}--overflow`;
  },
  methods: {
    enter: function (el) {
			gsap.from(el, {
        duration: 0.2,
        opacity: 0,
        display: 'none',
        ease: Power3.easeOut,
        delay: 0,
				onComplete: () => this.isPageLoaded = true,
      });
    },
  },
};
</script>

<style lang="scss">
.Collection
{
	&-hero
	{
    position: sticky;
		display: flex;
		justify-content: center;
    align-items: center;
    min-height: 100vh;
    top: 0;
	}

  &-hero--overflow
  {
    margin: 30vh 0;
    top: -60%;

    @include query(small)
    {
      margin: 33vh 0;
      top: -100%;
    }
  }
	
	&-images
	{
		position: relative;
		max-width: 800px;
		margin: 0 auto;
		z-index: 10;

    @include query(small) {
      top: -10vh;
    }
	}
}
</style>