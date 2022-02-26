<template>
  <div class="LazyLoad">
    <div
      v-if="dataUrl"
      :style="{ background }"
      class="LazyLoad-placeholder"
    >
      <img
        :src="placeholder || dataUrl"
        alt=""
        v-bind="$attrs"
      />
    </div>
    <img
      :src="dataUrl"
      :alt="$attrs.alt || ''"
      v-bind="$attrs"
      class="LazyLoad-img"
    />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'LazyLoad',
  props: {
    src: {
      type: String,
      required: true,
    },
    placeholder: String,
    background: String,
  },

  computed: {
    dataUrl() {
      const { width, height } = this.$attrs;
      if (!width || !height) return "";

      // create a tiny png with matching aspect ratio as img
      const w = 100;
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = (height / width) * w;

      return canvas.toDataURL();
    },
  },

  mounted() {
    const { src, srcset, $el } = this;
    let timeOut;

    const observer = new IntersectionObserver(([entry]) => {
      const img = $el.querySelector(`.LazyLoad-img`);
      const placeholder = $el.querySelector(`.LazyLoad-placeholder`);

      img.onload = function() {
        delete img.onload;
        $el.classList.add(`LazyLoad--loaded`);
        if (placeholder) {
          timeOut = setTimeout(() => {
            placeholder.remove();
          }, 300)
        }
      }
      if (entry.isIntersecting) {
        // Element is in viewport
        if (!!srcset) {
          img.srcset = srcset;
        }
        img.src = src;
        observer.disconnect();
      }
    });
    observer.observe($el);

    this.$once("hook:beforeDestroy", () => {
      observer.disconnect();
      if (timeOut) {
        clearTimeout(timeOut);
      }
    })
  },
}
</script>

<style lang="scss">
  .LazyLoad {
    display: inline-block;
    position: relative;

    &-placeholder {
      position: absolute;
      overflow: hidden;
    }

    &-placeholder img {
      transform: scale(1.05);
      filter: blur(10px);
    }

    &-img {
      max-width: 100%;
      max-height: 100%;
      opacity: 0;
      transition: opacity 300ms ease;
    }
  }

  .LazyLoad--loaded .LazyLoad-img {
    opacity: 1;
  }
</style>