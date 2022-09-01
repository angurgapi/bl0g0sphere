<template>
  <div class="comment f-row">
    <div
      class="comment__avatar f-column"
      :style="`background-image: url(${getCommentAvatar})`"
    />
    <div class="comment__right f-column">
      <div class="comment__header f-row">
        <span class="comment__author">{{ comment.author }}</span>
        <span class="comment__date">{{
          $moment.unix(comment.created_at.seconds).format('DD MMM HH:mm')
        }}</span>
      </div>
      <span class="comment__content">{{ comment.content }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  computed: {
    getCommentAvatar() {
      return '/img/placeholder.png'
    }
  }
}
</script>

<style lang="scss" scoped>
.comment {
  width: 100%;

  &__right {
    padding: 16px;
    width: 100%;
  }

  &__header {
    justify-content: space-between;
    width: 100%;
  }

  &__date {
    font-size: 13px;
    opacity: 0.8;
  }

  &__content {
    font-size: 12px;
  }

  &__avatar {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background-size: cover;
  }
}
</style>
