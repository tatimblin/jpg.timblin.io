<template>
  <section class="IntroSection">
    <p class="IntroSection-subtext">
      <time :datetime="date" v-if="date">{{ date | moment }}</time>
    </p>

    <transition v-bind:css="false" @enter="enterHeadline" appear>
      <h1 class="IntroSection-title" v-if="title">{{ title }}</h1>
    </transition>

    <transition v-bind:css="false" @enter="enterBody" appear>
      <p class="IntroSection-desc" v-if="description">
        {{ description }}
      </p>
    </transition>

    <ul class="IntroSection-highlights" v-if="highlights.length">
      <li
        class="IntroSection-highlight"
        v-for="highlight in highlights"
        :key="highlight"
      >
        {{ highlight }}
      </li>
    </ul>
  </section>
</template>

<script>
  import { gsap, Power3 } from 'gsap';
  import moment from 'moment';

  export default {
    scrollToTop: true,
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
      highlights: {
        type: Array,
        default: () => [],
      },
    },
    mounted() {
      if (!this.description) {
        if (this.date) this.enterSubtext();
        if (this.highlights.length) this.enterFacts();
      }
    },
    methods: {
      enterHeadline: function (el) {
        // Double split text to support swipe effect
        const parentClass = 'IntroSection-splitParent';
        new SplitText(el, { type: "lines", linesClass: parentClass });
        const splitHeadline = new SplitText(el.querySelectorAll(`.${parentClass}`), { type: "lines" });

        gsap.from(splitHeadline.lines, {
          duration: 1,
          opacity: 0,
          y: 60,
          ease: Power3.easeOut,
          onComplete: () => {
            splitHeadline.revert();
          },
          stagger: 0.2,
        });
      },
      enterBody: function (el) {
        let stagger = 0.2;

        const splitSubline = new SplitText(el, { type: "lines" });

        gsap.from(splitSubline.lines || [], {
          duration: 1,
          opacity: 0,
          y: 10,
          ease: Power3.easeOut,
          delay: 1,
          onRepeat: () => {
            stagger *= 0.5;
          },
          onComplete: () => {
            splitSubline.revert();
            this.enterSubtext();
            this.enterFacts();
          },
          stagger,
        });
      },
      enterSubtext: function () {
        gsap.to('.IntroSection-subtext', {
          duration: 0.5,
          opacity: 1,
          x: 0,
          ease: Power3.easeOut,
        });
      },
      enterFacts: function () {
        gsap.to('.IntroSection-highlight', {
          duration: 0.6,
          opacity: 1,
          y: 0,
          ease: Power3.easeOut,
          delay: 1,
          stagger: 0.15,
        });
      },
    },
    filters: {
      moment (date) {
        return moment(date).format('MMMM YYYY');
      },
    },
  }
</script>

<style lang="scss">
  .IntroSection {
    width: 100%;
    min-height: 300px;
    margin: 0 calc(#{$spacing} / 2);
    left: auto;
    right: auto;

    @include query(small) {
      width: map-get($breakpoints, small);
      min-height: auto;
    }

    @include query(large) {
      width: map-get($breakpoints, medium);
    }

    &-subtext {
      @include brow;

      opacity: 0;
      transform: translateX(-10px);
    }

    &-title {
      @include lead;

      margin-bottom: 20px;
      font-kerning: none;
      line-height: 1.375em;
    }

    &-splitParent {
      overflow: hidden;
      box-sizing: border-box;
    }

    &-desc {
      @include body;
    }

    &-highlights {
      margin: $spacing 0;
      columns: 2;

      @include query(small) {
        columns: 3;
      }
    }

    &-highlight {
      @include rib;

      opacity: 0;
      transform: translateY(-10px);
    }
  }
</style>
