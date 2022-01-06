<template>
  <main class="Collection" v-if="post">
    <div class="Collection-hero">
      <intro-section v-if="post.fields" v-bind="post.fields" />
    </div>
    <transition
      v-bind:css="false"
      @enter="enter"
      appear
    >
      <div class="Collection-body">
        <div class="Collection-images">
          <image-gallery :gallery="post.fields.gallery"></image-gallery>
        </div>
        <next-page :at="post.fields.date" :ready="isPageLoaded" />
      </div>
    </transition>
  </main>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
import TweenMax from 'gsap'
import IntroSection from '~/components/Collection/IntroSection'
import ImageGallery from '~/components/Collection/ImageGallery'
import NextPage from '~/components/NextPage'

const client = createClient()

export default {
  layout: 'default',
  components: {
    IntroSection,
    ImageGallery,
    NextPage
  },
  asyncData ({ $config: { postTypeID }, params }) {
    return client.getEntries({
      'content_type': postTypeID,
      'fields.slug': params.slug
    }).then(entries => {
      return {
        post: entries.items[0] || null,
        isPageLoaded: false,
      }
    })
    .catch(console.error)
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
    width: 100vw;
    min-height: 100vh;
    top: -50vh;
    bottom: 0;
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