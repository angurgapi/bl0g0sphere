<template>
  <div class="accordion">
    <button
      class="btn accordion__btn"
      :class="{ 'accordion__btn--active': isOpen }"
      @click="toggleAccordion"
    >
      <span class="accortion__title">{{ title }}</span>
      <svg-icon name="chevron-down" height="5" width="10" />
    </button>
    <transition name="fade">
      <div v-show="isOpen" class="accordion__content">
        <slot name="content" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Accordion',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data: () => ({
    isOpen: false
  }),

  methods: {
    toggleAccordion() {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style lang="scss" scoped>
.accordion {
  width: 100%;
  height: fit-content;

  &__btn {
    svg {
      margin-left: 10px;
      fill: #fff;
      transition: 0.4s all ease-in-out;
    }

    &--active {
      svg {
        transform: rotate(180deg);
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease-in-out;
}

.fade-enter,
 .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: scaleY(0.5);
}
</style>
