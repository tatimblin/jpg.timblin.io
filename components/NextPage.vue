<template>
  <div class="NextPage">
    <slot></slot>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  mounted () {
    this.$triggerNextPage(this.nextPage)
  },
  methods: {
    nextPage () {
      this.$router.push(this.getNextPage)
    }
  },
  computed: {
    ...mapGetters(['getNextPage'])
  },
};
</script>