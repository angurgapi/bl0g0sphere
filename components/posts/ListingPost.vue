<template>
  <div class="card">
    <div class="post">
      <div class="post__header">{{ post.title }}</div>
      <div class="post__body">
        <span class="post__content">{{ getPreviewText }}</span>
      </div>
      <div class="post__footer">
        <span class="post__author">автор: </span>
        <Tooltip text="Показать все новости автора">
          <button class="btn post__btn" @click="$emit('getAll', post.author)">
            {{ post.author }}
          </button>
        </Tooltip>
      </div>
    </div>
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
      return this.post.content.substr(0, 100)
    }
  }
}
</script>

<style lang="scss" scoped>
.post {
  display: flex;
  flex-direction: column;

  &__header {
    border-radius: 10px 10px 0 0;
    color: #fff;
    background-color: rgb(25, 28, 31);
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
