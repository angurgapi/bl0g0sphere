<template>
  <component :is="errorPage" v-if="errorPage" :error="error" />
</template>

<script>
import error404 from '@/components/errors/404'
import error500 from '@/components/errors/500'

export default {
  name: 'Error',
  components: {
    error404,
    error500
  },
  layout: 'redesignDefault',
  props: {
    error: {
      type: Object,
      required: true
    }
  },
  head() {
    return {
      bodyAttrs: {
        class: 'bg-white'
      },
      title: 'Ошибка'
    }
  },
  computed: {
    errorPage() {
      switch (this.error.statusCode) {
        case 404:
          return error404
        case 500:
          return error500
        default:
          break
      }
    }
  }
}
</script>
