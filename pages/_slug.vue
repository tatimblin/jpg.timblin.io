<template>
  <main class="Collection">
    <div class="Collection-hero">
      <intro-section v-bind="{title, description, date, facts}"></intro-section>
    </div>
    <div class="Collection-body">
      <image-gallery :gallery="gallery"></image-gallery>
    </div>
  </main>
</template>

<script>
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
      console.log('callback function fired!')
      this.$router.push('404')
    }
  }
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