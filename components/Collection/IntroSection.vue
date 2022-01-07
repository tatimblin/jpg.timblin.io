<template>
  <section class="IntroSection">
    <p class="IntroSection-subtext">
      <time :datetime="date" itemprop="dateCreated" v-if="date">{{ date | moment }}</time>
    </p>
    <transition
      v-bind:css="false"
      @enter="enterHeadline"
      appear
    >
      <h1 class="IntroSection-title" itemprop="name" v-if="title">{{ title }}</h1>
    </transition>
    <transition
      v-bind:css="false"
      @enter="enterBody"
      appear
    >
      <p class="IntroSection-desc" itemprop="about" v-if="description">{{ description }}</p>
    </transition>
    <ul class="IntroSection-facts" v-if="facts.length">
      <li class="IntroSection-fact"
        itemprop="keywords"
        v-for="fact in facts"
        :key="fact"
      >
        {{ fact }}
      </li>
    </ul>
  </section>
</template>

<script>
import Vue from 'vue'
import TweenMax from 'gsap'
import moment from 'moment'

export default {
  head () {
    return {
      title: `${this.title} - photography by tris timb`,
      meta: [
        { hid: 'description', name: 'description', content: this.description },
      ],
    }
  },
  props: {
    title: {
      type: String,
      default: null,
    },
    date: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null
    },
    facts: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    enterHeadline: function (el) {
      // Double split text to support swipe effect
      const parentClass = 'IntroSection-splitParent';
      new SplitText(el, { type: "lines", linesClass: parentClass });
      const splitHeadline = new SplitText(el.querySelectorAll(`.${parentClass}`), { type: "lines" });

      TweenMax.staggerFrom(splitHeadline.lines, 1, {
        y: 110,
        ease: Power3.easeOut,
        onComplete: () => {
          splitHeadline.revert();
        }
      }, 0.15);
    },
    enterBody: function (el) {
      let stagger = 0.2;

      const splitSubline = new SplitText(el, { type: "lines" });

			TweenMax.staggerFrom(splitSubline.lines || [], 1.33, {
        opacity: 0,
        y: 10,
        ease: Power3.easeOut,
        delay: 2,
        onRepeat: () => {
          stagger *= 0.9;
        },
				onComplete: () => {
          splitSubline.revert();
          this.enterSubtext();
          this.enterFacts();
        },
      }, stagger);
    },
    enterSubtext: function () {
      TweenMax.to('.IntroSection-subtext', .75, {
        opacity: 1,
        x: 0,
        ease: Power3.easeOut,
      });
    },
    enterFacts: function () {
      TweenMax.staggerTo('.IntroSection-fact', 2, {
        opacity: 1,
        y: 0,
        ease: Power3.easeOut,
        delay: 0.15
      }, 0.15);
    },
  },
  filters: {
    moment (date) {
      return moment(date).format('MMMM YYYY')
    },
  },
}
</script>

<style lang="scss">
.IntroSection
{
  width: 100%;
  margin: 0 $spacing/2;
  left: auto;
  right: auto;

  @include query(small)
  {
    width: map-get($breakpoints, small);
  }

  @include query(large)
  {
    width: map-get($breakpoints, medium);
  }

  &-subtext
  {
    @include brow;

    opacity: 0;
    transform: translateX(-10px);
  }

  &-title
  {
    @include lead;

    margin-bottom: 20px;
    font-kerning: none;
    line-height: 1.375em;
  }

  &-splitParent
  {
    overflow: hidden;
    box-sizing: border-box;
  }

  &-desc
  {
    @include body;
  }

  &-facts
  {
    margin: $spacing 0;
    columns: 2;

    @include query(small)
    {
      columns: 3;
    }
  }

  &-fact
  {
    @include rib;

    opacity: 0;
    transform: translateY(-10px);
  }
}
</style>
