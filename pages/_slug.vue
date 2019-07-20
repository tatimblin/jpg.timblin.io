<template>
  <main class="Collection">
    <div class="Collection-hero">
      <intro-section v-bind="{title, description, date, region, camera, theme, facts}"></intro-section>
    </div>
    <transition
      v-bind:css="false"
      @enter="enter"
      appear
    >
      <div class="Collection-body">
        <image-gallery :gallery="gallery"></image-gallery>
        <next-page>Next Page!</next-page>
      </div>
    </transition>
  </main>
</template>

<script>
import TweenMax from 'gsap'
import IntroSection from '~/components/Collection/IntroSection'
import ImageGallery from '~/components/Collection/ImageGallery'
import NextPage from '~/components/NextPage'

export default {
  layout: 'default',
  components: {
    IntroSection,
    ImageGallery,
    NextPage
  },
  async asyncData({ params }) {
    let post = await import('~/content/collections/' + params.slug + '.json')
    return post
  },
  methods: {
    enter: function (el, done) {
			TweenMax.from(el, 1.5, {
        opacity: 0,
        display: 'none',
        ease:Power3.easeOut,
        delay: 2,
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
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 100vh;
	}
	
	&-body
	{
		position: relative;
		max-width: 800px;
		margin: 0 auto;
		z-index: 10;
	}
}
</style>