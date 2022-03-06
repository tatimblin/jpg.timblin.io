<template>
  <nav class="NavBar">
    <ul class="NavBar-list">
      <li class="NavBar-item">
        <nuxt-link class="NavBar-link" to="/">
          Home
        </nuxt-link>
      </li>
      <li class="NavBar-item">
        <nuxt-link :class="`${collectionsActive()} NavBar-link`" to="/start">
          Collections
        </nuxt-link>
      </li>
      <li class="NavBar-item">
        <nuxt-link class="NavBar-link" to="/about">
          About
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    collectionsActive() {
      return this.$route.name === 'slug' ? 'nuxt-link-exact-active' : '';
    }
  }
};
</script>

<style lang="scss" scoped>
  .NavBar
  {
    position: absolute;
    z-index: 100;
    width: 100%;
    top: 12px;
    left: 0;

    &-list
    {
      display: flex;
      justify-content: center;
    }

    &-item
    {
      margin: 0 8px;
      padding: 2px 8px;
    }

    &-link
    {
      @include link;
    }

    &-link.nuxt-link-exact-active
    {
      color: $black;

      &:hover,
      &:focus
      {
        text-decoration: none;
      }
    }
  }
</style>
