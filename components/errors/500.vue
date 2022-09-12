<template>
  <div class="page error-page">
    <span class="error-page__title">Упс! Что-то пошло не так</span>
    <button class="btn error-page__btn" @click="refresh">Обновить</button>
  </div>
</template>

<script>
export default {
  name: 'error500',

  props: {
    error: {
      type: Object,
      required: false
    }
  },

  methods: {
    refresh() {
      window.location.reload()
    }
  }
}
</script>

<style lang="scss">
.error-page {
  &__btn {
    color: #19249e;
  }
}
</style>
