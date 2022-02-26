<template>
  <section class="ImageGallery">
    <div
      class="ImageGallery-item"
      v-for="(image, index) in gallery"
      :key="image.fields.file.url"
    >
      <img
        v-if="index === gallery.length - 1"
        class="ImageGallery-img"
        :style="imageOffset()"
        :src="image.fields.file.url + '?fit=pad&w=800&h=600'"
        :alt="image.fields.title"
      />
      <lazy-load
        v-else
        class="ImageGallery-img"
        :style="imageOffset()"
        :src="image.fields.file.url + '?fit=pad&w=800&h=600'"
        :alt="image.fields.title"
      />
    </div>
  </section>
</template>

<script>
  import LazyLoad from '../LazyLoad.vue';

  export default {
    props: ['gallery'],
    components: {
      LazyLoad,
    },
    methods: {
      imageOffset () {
        return `transform: translate(${this.randomInt(20)}vw, ${this.randomInt(10)}vh)`;
      },
      randomInt (max) {
        return Math.floor(Math.random() * Math.floor(max) - max / 2);
      }
    }
  }
</script>

<style lang="scss">
  .ImageGallery {
    display: flex;
    flex-direction: column-reverse;
    text-align: center;
    
    &-item {
      position: sticky;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100vh;
      bottom: 0;
      overflow: hidden;

      @include query(large) {
        overflow: visible;
      }
    }

    &-img {
      max-width: calc(100vw - 64px);
      max-height: calc(100vh - 64px);

      @include query(small) {
        max-width: calc(100vw - 128px);
        max-height: calc(100vh - 128px);
      }

      @include query(medium) {
        max-width: calc(100vw - 192px);
        max-height: calc(100vh - 192px);
      }
    }
  }
</style>
