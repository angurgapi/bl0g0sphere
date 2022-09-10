<template>
  <img
    v-if="name || src"
    :src="getIcon(name)"
    :alt="alt"
    :width="width"
    :height="height"
    v-on="$listeners"
  />
</template>

<script>
export default {
  name: 'SvgImage',

  props: {
    src: {
      type: String,
      required: false
    },

    name: {
      type: String,
      required: true,
      validator: (value) => !value.includes('.')
    },

    alt: {
      type: String,
      default: 'image'
    },

    width: [String, Number],

    height: [String, Number]
  },

  methods: {
    getIcon(name) {
      return this.src || require(`/assets/icons/${name}.svg`)
    }
  }
}
</script>
