<template>
  <div class="sort-menu" @mouseleave="close">
    <div class="sort-menu__option sort-menu__option--selected" @click="open">
      {{ getLabel }}
      <svg-icon
        name="chevron-down"
        class="sort-menu__arrow"
        :class="{ 'sort-menu__arrow--open': isOpen }"
      />
    </div>

    <ul v-if="isOpen" class="sort-menu__options">
      <li
        v-for="option in options"
        :key="option.value"
        class="sort-menu__option"
        @click="pickOption(option.value)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SortMenu',
  props: {
    label: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    isOpen: false,
    selectedValue: ''
  }),
  computed: {
    getLabel() {
      return this.selectedValue
        ? this.options.find((option) => option.value === this.selectedValue)
            .label
        : this.label
    }
  },
  methods: {
    open() {
      this.isOpen = !this.isOpen
    },
    close() {
      this.isOpen = false
    },
    pickOption(val) {
      console.log(val)
      this.selectedValue = val
      this.$emit('input', val)
      this.close()
    }
  }
}
</script>

<style lang="scss" scoped>
.sort-menu {
  position: relative;

  &__options {
    position: absolute;
    z-index: 100;
    border-radius: 0 0 8px 8px;
    width: 100%;
    background: #fff;
  }

  &__option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    width: 100%;
    font-size: 14px;
    letter-spacing: 0.3px;

    &:hover {
      background-color: rgba(48, 73, 161, 20%);
    }

    &--selected {
      color: #192f80;
    }
  }

  &__arrow {
    margin-left: 8px;
    width: 12px;
    height: 7px;
    fill: #192f80;
    transition: 0.4s all ease-in-out;

    &--open {
      transform: rotate(180deg);
    }
  }
}
</style>
