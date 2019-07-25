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
  height: 100vh;
  background-color: #f1f1f1;
}
</style>
