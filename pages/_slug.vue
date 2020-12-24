<template>
  <main class="Collection">
    <div class="Collection-hero">
      <intro-section
        :title="post.fields.title"
        :date="post.fields.date"
        :description="post.fields.description"
        :facts="post.fields.highlights"
      />
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
        <next-page :at="post.fields.date" />
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
        post: entries.items[0]
      }
    })
    .catch(console.error)
  },
  methods: {
    enter: function (el, done) {
			TweenMax.from(el, 1, {
        opacity: 0,
        display: 'none',
        ease:Power3.easeOut,
        delay: 2.5,
				onComplete: done
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
		width: 100vw;
    height: 100vh;
    top: 0;
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