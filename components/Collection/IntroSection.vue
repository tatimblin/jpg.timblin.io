<template>
  <section class="IntroSection">
    <p class="IntroSection-subtext">
      <time :datetime="date" itemprop="dateCreated" v-if="date">{{ date | moment }}</time>
    </p>
    <transition
      v-bind:css="false"
      @enter="enterHeadline"
      @after-enter="afterEnter"
      appear
    >
      <h1 class="IntroSection-title" itemprop="name" v-if="title">{{ title }}</h1>
    </transition>
    <transition
      v-bind:css="false"
      @enter="enterBody"
      @after-enter="afterEnterBody"
      appear
    >
      <p class="IntroSection-desc" itemprop="about" v-if="description">{{ description }}</p>
    </transition>
    <ul class="IntroSection-facts">
      <li class="IntroSection-fact"
        itemprop="keywords"
        v-if="facts"
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
  mounted () {
    // simpler animations
    TweenMax.from('.IntroSection-subtext', .75, {
      opacity: 0,
      x: -10,
      ease: Power3.easeOut,
      delay: 2.33
    })
    TweenMax.staggerFrom('.IntroSection-fact', 2, {
      opacity: 0,
      x: -5,
      ease: Power3.easeOut,
      delay: 2.33
    }, 0.15)
  },
  props: {
    title: {
      type: String,
    },
    date: {
      type: String,
    },
    description: {
      type: String,
    },
    facts: {
      type: Array,
    },
  },
  methods: {
    enterHeadline: function (el, done) {
      this.splitHeadline = new SplitText(".IntroSection-title", {type: "lines"});
      if (this.splitHeadline.lines.length > 1) {
        new SplitText(".IntroSection-title", { type: "lines", linesClass: "IntroSection-splitParent" });
      }
			TweenMax.staggerFrom(this.splitHeadline.lines, 1, {
        y: 110,
        delay: 0.3,
        ease: Power3.easeOut,
				onComplete: done
      }, 0.15);
    },
    enterBody: function (el, done) {
      this.splitSubline = new SplitText(".IntroSection-desc", {type: "lines"});
			TweenMax.staggerFrom(this.splitSubline.lines, 1.33, {
        opacity: 0,
        y: 10,
        ease: Power3.easeOut,
        delay: 2,
				onComplete: done
      }, 0.2);
    },
    afterEnter: function () {
      this.splitHeadline.revert()
    },
    afterEnterBody: function () {
      this.splitSubline.revert()
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
  }
}
</style>
