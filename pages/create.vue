<template>
  <div class="page">
    <h2 class="page__header">Добавление новости</h2>
    <NewPostForm />
  </div>
</template>

<script>
import NewPostForm from '@/components/posts/NewPostForm'

export default {
  name: 'CreatePost',
  components: { NewPostForm }
}
</script>
