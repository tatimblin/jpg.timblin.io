<template>
  <section class="IntroSection">
    <p class="IntroSection-subtext">
      <time :datetime="date">{{ date | moment }}</time>
    </p>
    <transition
      v-bind:css="false"
      @enter="enterHeadline"
      @after-enter="afterEnter"
      appear
    >
      <h1 class="IntroSection-title">{{ title }}</h1>
    </transition>
    <transition
      v-bind:css="false"
      @enter="enterBody"
      @after-enter="afterEnterBody"
      appear
    >
      <p class="IntroSection-desc">{{ description }}</p>
    </transition>
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
import TweenMax from 'gsap';
import moment from 'moment'

export default {
  props: ['title', 'description', 'date', 'facts'],
  mounted () {
    TweenMax.from('.IntroSection-subtext', .5, {
      opacity: 0,
      x: -10,
      ease: Power3.easeOut,
      delay: 1
    });
    TweenMax.staggerFrom('.IntroSection-fact', 1.25, {
      opacity: 0,
      x: -15,
      ease: Power3.easeOut,
      delay: 3
    }, 0.25);
  },
  methods: {
    enterHeadline: function (el, done) {
      this.splitHeadline = new SplitText(".IntroSection-title", {type: "lines"});
      if (this.splitHeadline.lines.length > 1) {
        new SplitText(".IntroSection-title", { type: "lines", linesClass: "IntroSection-splitParent" });
      }
			TweenMax.staggerFrom(this.splitHeadline.lines, 1.2, {
        y: 110,
        delay: 1.1,
        ease: Power3.easeOut,
				onComplete: done
      }, 0.3);
    },
    enterBody: function (el, done) {
      this.splitSubline = new SplitText(".IntroSection-desc", {type: "lines"});
			TweenMax.staggerFrom(this.splitSubline.lines, 2.2, {
        opacity: 0,
        y: 10,
        ease: Power3.easeOut,
        delay: 1.8,
				onComplete: done
      }, 0.22);
    },
    afterEnter: function () {
      //this.splitHeadline.revert()
    },
    afterEnterBody: function () {
      this.splitSubline.revert()
    },
  },
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
  width: 100%;
  max-width: 650px;
  margin: 0 $spacing/2;

  &-subtext
  {
    @include brow;
  }

  &-title
  {
    @include lead;

    font-kerning: none;
    overflow: hidden;
  }

  &-splitParent
  {
    overflow: hidden;
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

