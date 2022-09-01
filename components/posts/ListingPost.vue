<template>
  <div class="card">
    <nuxt-link target="_blank" :to="`/posts/${post.id}`" class="post">
      <div class="post__header">{{ post.title }}</div>
      <div class="post__body">
        <p class="post__content">
          {{ getPreviewText
          }}<span v-if="isPostLong" class="post__more"
            >...читать продолжение в источнике</span
          >
        </p>
        <span class="post__date">Опубликовано {{ getPostDate }}</span>
      </div>
      <div class="post__footer">
        <span class="post__author">автор: </span>
        <Tooltip text="Показать все новости автора">
          <button class="btn post__btn" @click="$emit('getAll', post.author)">
            {{ post.author }}
          </button>
        </Tooltip>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'ListingPost',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    getPreviewText() {
      return this.isPostLong
        ? this.post.content.substr(0, 100)
        : this.post.content
    },
    isPostLong() {
      return this.post.content.length > 100
    },
    getPostDate() {
      return (
        this.$moment
          .unix(this.post.created_at.seconds, 'YYYY-MM-DD')
          .format('DD.MM HH:mm') ||
        this.$moment.utc(this.post.created_at).format('DD.MM HH:mm')
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.post {
  display: flex;
  flex-direction: column;
  color: rgb(25, 28, 31);

  &__header {
    border-radius: 10px 10px 0 0;
    color: #fff;
    background-color: rgb(25, 28, 31);
  }

  &__date {
    margin-top: 24px;
    font-size: 12px;
    color: rgba(0, 0, 0, 60%);
  }

  &__footer {
    display: flex;
    border-top: 1px solid #7b8ea7;
  }

  &__btn {
    height: 22px;
    font-size: 20px;
    color: #19249e;
  }

  &__more {
    color: #19249e;
  }

  &__header,
  &__body,
  &__footer {
    padding: 16px;
  }
}

.card {
  transition: 0.4s all ease-in-out;

  &:not(first-child) {
    margin-top: 20px;
  }

  &:hover {
    transform: scale(1.05);
  }
}
</style>
