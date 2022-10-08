<template>
  <svg class="ScrollIndicator" viewBox="0 0 88 215" fill="none" xmlns="http://www.w3.org/2000/svg">
    <title>Scroll down to images</title>
    <rect class="ScrollIndicator-mouse" x="2.5" y="2.5" width="83" height="148" rx="41.5" stroke="#000" fill="currentColor" stroke-width="5"/>
    <path class="ScrollIndicator-animate" stroke="#000" stroke-width="5" stroke-linecap="round" d="M44.5 21.5v25M44 184.678 61.678 167M25.535 167.107l17.678 17.677"/>
  </svg>
</template>

<style lang="scss" scoped>
.ScrollIndicator {
  position: fixed;
  height: 56px;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  animation: fade-in 1s 2500ms 1 ease-out forwards;
  z-index: 20;

  &-mouse {
    color: transparent;
    transition: all $timing $ease;
  }

  &-animate {
    animation: scroll-down 1s ease-out infinite;
  }

  &:hover .ScrollIndicator-mouse {
    color: $gray100;
  }
}

@keyframes fade-in {
  from {
    transform: translateY(-10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes scroll-down {
  0% {
    transform: translateY(-5px);
    opacity: 0;
  }
  33% {
    opacity: 1;
  }
  66% {
    transform: translateY(25px);
  }
  100% {
    transform: translateY(25px);
    opacity: 0;
  }
}
</style>