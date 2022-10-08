<template>
  <div class="app">
    <nav-bar v-show="hideHeader" />
    <nuxt />
  </div>
</template>

<script>
import NavBar from '~/components/NavBar.vue';

export default {
  components: {
    NavBar
  },
  computed: {
    hideHeader() {
      return process.env.NUXT_HIDE_HEADER !== 'true';
    }
  }
};
</script>
