<template>
  <nav class="NavBar">
    <ul class="NavBar-list">
      <li class="NavBar-item">
        <nuxt-link to="/">
          Home
        </nuxt-link>
      </li>
      <li class="NavBar-item">
        <nuxt-link to="/start">
          Collections
        </nuxt-link>
      </li>
      <li class="NavBar-item">
        <nuxt-link to="/about">
          About
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
};
</script>

<style lang="scss" scoped>
  .NavBar
  {
    position: absolute;
    z-index: 100;
    width: 100%;
    top: 5px;
    left: 0;

    &-list
    {
      display: flex;
      justify-content: center;
    }

    &-item
    {
      margin: 2px 8px;
      padding: 2px 8px;
    }
  }
</style>
