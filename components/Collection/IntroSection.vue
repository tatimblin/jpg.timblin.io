<template>
  <section class="IntroSection">
    <p class="IntroSection-subtext">
      <time :datetime="date">{{ date | moment }}</time>
    </p>
    <h1 class="IntroSection-title">{{ title }}</h1>
    <p class="IntroSection-desc">{{ description }}</p>
    <ul class="IntroSection-facts">
      <li class="IntroSection-fact"
        v-for="fact in facts"
        :key="fact"
      >
        {{ fact }}
      </li>
    </ul>
  </section>
</template>

<script>
import moment from 'moment'

export default {
  props: ['title', 'description', 'date', 'facts'],
  filters: {
    moment (date) {
      return moment(date).startOf('day').fromNow()
    }
  }
}
</script>

<style lang="scss">
.IntroSection
{
  max-width: 650px;
  margin: 0 $spacing/2;

  &-subtext
  {
    @include brow;
  }

  &-title
  {
    @include lead;
  }

  &-desc
  {
    @include body;
  }

  &-facts
  {
    margin: $spacing 0;
    columns: 3;
  }

  &-fact
  {
    @include rib;
  }
}
</style>

