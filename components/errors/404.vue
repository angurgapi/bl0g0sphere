<template>
  <div class="error-page">
    <span class="error-page__title">Упс! Страница не найдена</span>
    <nuxt-link to="/" class="btn error-page__btn">На главную</nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'error404',

  props: {
    error: {
      type: Object,
      required: false
    }
  }
}
</script>

<style lang="scss">
.error-page {
  &__title {
    font-size: 24px;
  }

  &__btn {
    color: #19249e;
  }
}
</style>
