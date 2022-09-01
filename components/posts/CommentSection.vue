<template>
  <div class="comment-section card">
    <div class="comment-section__header f-row">
      <span class="comment-section__title">Комментарии</span>
      <div class="comment-section__counter f-column">{{ comments.length }}</div>
    </div>
    <ul class="comment-section__list">
      <li v-for="comment in comments" :key="comment.id">
        <CommentItem :comment="comment" />
      </li>
    </ul>
  </div>
</template>

<script>
import CommentItem from './CommentItem'
export default {
  name: 'CommentSection',
  components: {
    CommentItem
  },
  props: {
    comments: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-section {
  padding: 20px;
  width: 100%;
  max-width: 600px;

  &__title {
    font-weight: 500;
    font-size: 22px;
  }

  &__counter {
    align-items: center;
    margin-left: 10px;
    border-radius: 50%;
    padding: 10px;
    width: 40px;
    height: 40px;
    text-align: center;
    color: #000;
    background-color: rgba(0, 0, 0, 10%);
  }

  &__list {
    width: 100%;
  }
}
</style>
