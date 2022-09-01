<template>
  <div class="tooltip-trigger">
    <slot />
    <div
      class="tooltip"
      :class="{
        'tooltip--bottom': bottom,
        'tooltip--tipless': tipless,
        'tooltip--left': left
      }"
    >
      <span v-if="text" class="content">{{ text }}</span>
      <slot v-else name="content" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    text: {
      type: String
    },
    tipless: {
      type: Boolean,
      default: false
    },
    bottom: {
      type: Boolean,
      default: false
    },
    left: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getTooltipOffset() {
      const offsetRight = document
        .querySelector('.content')
        .getBoundingClientRect().right
    }
  }
}
</script>

<style lang="scss" scoped>
.tooltip-trigger {
  position: relative;
  display: inline-block;
  padding-left: 8px;
}

.tooltip-trigger:hover .tooltip {
  display: flex;
  opacity: 1;
}

.tooltip {
  position: absolute;
  left: 50%;
  bottom: 100%;
  z-index: 1010;
  display: none;
  margin-left: -125px;
  border-radius: 10px;
  padding: 10px;
  width: 250px;
  height: fit-content;
  box-shadow: 0 8px 24px rgba(233, 233, 233, 84%),
    0 -8px 24px rgba(233, 233, 233, 84%);
  font-family: 'Rubik';
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.3px;
  white-space: normal;
  text-align: center;
  color: #000;
  background-color: #fff;

  // opacity: 0;
  transition: opacity 1s;

  .content {
    z-index: 1010;
    margin: 0 auto;
  }

  &--bottom {
    top: 100%;
  }

  &--left {
    left: 0;
    right: 20px;
  }

  &--tipless {
    .content::after {
      display: none !important;
    }
  }
}

.content::after {
  content: ' ';
  position: absolute;
  left: 50%;
  top: 100%;
  margin-left: -5px;
  border-style: solid;
  border-width: 5px;
  border-color: #fff transparent transparent;
}
</style>
