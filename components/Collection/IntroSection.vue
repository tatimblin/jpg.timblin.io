<template>
  <section class="IntroSection">
    <span class="IntroSection-fact">{{ date }}</span>
    <h1 class="IntroSection-title">{{ title }}</h1>
    <p class="IntroSection-desc">{{ description }}</p>
    <ul class="IntroSection-facts">
      <li class="Introsection-fact"
        v-for="fact in facts"
        :key="fact"
      >
        {{ fact }}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: ['title', 'description', 'date', 'facts'],
}
</script>

