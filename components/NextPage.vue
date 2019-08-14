<template>
  <div class="NextPage">
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

<style lang="scss">
.NextPage
{
  position: relative;
  height: 90vh;
  background: rgb(255,255,255);
  background: linear-gradient(0deg, rgba(255,255,255,1) 85%, rgba(255,255,255,0) 100%);
  z-index: 1;
}
</style>
