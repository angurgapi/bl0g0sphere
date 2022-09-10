<template>
  <div class="page">
    <h2 class="page__header">Новости</h2>
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
