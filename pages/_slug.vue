<template>
  <main class="Collection">
    <div class="Collection-hero">
      <intro-section v-bind="{title, description, date, facts}"></intro-section>
    </div>
    <transition
      v-bind:css="false"
      @enter="enter"
      appear
    >
      <div class="Collection-body">
        <image-gallery :gallery="gallery"></image-gallery>
      </div>
    </transition>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import TweenMax from 'gsap'
import IntroSection from '~/components/Collection/IntroSection'
import ImageGallery from '~/components/Collection/ImageGallery'

export default {
  layout: 'default',
  transition: 'fade',
  components: {
    IntroSection,
    ImageGallery
  },
  mounted () {
    this.$triggerNextPage(this.nextPage)
  },
  async asyncData({ params }) {
    let post = await import('~/content/collections/' + params.slug + '.json')
    return post
  },
  methods: {
    nextPage () {
      this.$router.push(this.getNextPage)
    },
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
  computed: {
    ...mapGetters(['getNextPage'])
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