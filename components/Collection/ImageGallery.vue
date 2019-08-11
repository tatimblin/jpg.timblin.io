<template>
  <section class="ImageGallery">
    <div
      class="ImageGallery-item"
      v-for="image in gallery"
      :key="image.index"
    >
      <img
        class="ImageGallery-img"
        itemprop="image"
        :style="imageOffset()"
        :src="image.url"
        :alt="image.alt"
        ref="js-img"
      >
    </div>
  </section>
</template>

<script>
export default {
  props: ['gallery'],
  mounted () {
  },
  methods: {
    imageOffset () {
      return `transform: translate(${this.randomInt(20)}vw, ${this.randomInt(10)}vh)`
    },
    randomInt (max) {
      return Math.floor(Math.random() * Math.floor(max) - max / 2)
    }
  }
}
</script>

<style lang="scss">
.ImageGallery
{
	display: flex;
	flex-direction: column-reverse;
  text-align: center;
	
	&-item
	{
		position: sticky;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100vh;
    bottom: 0;
    overflow: hidden;

    @include query(large)
    {
      overflow: visible;
    }
	}

	&-img
	{
		max-width: calc(100% - 30px);
		max-height: calc(100vh - 30px);
	}
}
</style>
