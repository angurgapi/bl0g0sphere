<template>
  <div class="page">
    <div class="page__header">Новости</div>
    <Feed />
  </div>
</template>

<script>
import Feed from '@/components/posts/Feed'

export default {
  name: 'IndexPage',
  components: { Feed },
  head: {
    title: 'blogosphere'
  }
}
</script>

<style lang="scss" scoped>
.card {
  max-width: 800px;
}
</style>
