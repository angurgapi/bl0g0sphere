<template>
  <component
    :is="dynamicIcon"
    :width="width"
    :height="height"
    class="svg-icon"
    v-on="$listeners"
  />
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    width: [Number, String],
    height: [Number, String]
  },

  computed: {
    dynamicIcon() {
      return require(`~/assets/icons/${this.name}.svg`).default
    }
  }
}
</script>
