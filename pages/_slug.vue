<template>
  <main class="Collection" v-if="post">
    <div class="Collection-hero">
      <intro-section v-if="post.fields" v-bind="post.fields" ref="textContent" />
    </div>

    <a href="#images">
      <scroll-indicator />
    </a>

    <transition v-bind:css="false" @enter="enter" appear>
      <div class="Collection-images" id="images">
        <image-gallery :gallery="post.fields.gallery" />
      </div>
    </transition>

    <next-page :at="post.fields.order" :ready="isPageLoaded" />
  </main>
</template>

<script>
import { createClient } from '~/plugins/contentful.js';
import TweenMax from 'gsap';
import IntroSection from '~/components/Collection/IntroSection';
import ImageGallery from '~/components/Collection/ImageGallery';
import NextPage from '~/components/NextPage';
import ScrollIndicator from '~/components/ScrollIndicator';

const client = createClient();

export default {
  layout: 'default',
  components: {
    IntroSection,
    ImageGallery,
    NextPage,
    ScrollIndicator,
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
    else return Promise.all([
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
          post: posts.items[0] || null,
          global: globals.items[0] || null,
        }
      })
      .catch(console.error);
  },
  mounted() {
    const isGreaterThanViewport = this.$refs.textContent.$el.clientHeight > window.innerHeight;
    if (isGreaterThanViewport) this.heroClass += ` ${this.heroClass}--overflow`;
  },
  methods: {
    enter: function (el) {
			TweenMax.from(el, 1, {
        opacity: 0,
        display: 'none',
        ease:Power3.easeOut,
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
    width: 100%;
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
	}
}
</style>