<template>
  <div class="page">
    <div class="post card">
      <span class="post__title">{{ post.title }}</span>
      <span class="post__body" v-html="post.content"></span>
      <template v-if="post.images">
        <div
          class="post__cover"
          :style="`background-image: url(${post.images[0]})`"
        />
      </template>
      <div class="post__footer f-row">
        <div class="post__author f-row">
          Автор: {{ post.author
          }}<a
            v-if="post.email"
            :href="`mailto:${post.email}`"
            class="post__email"
            ><svg-icon name="envelope" />{{ post.email }}</a
          >
        </div>
      </div>
      <span class="post__date">Опубликовано {{ getPostDate }}</span>
    </div>
    <CommentSection v-if="comments.length" :comments="comments" />
  </div>
</template>

<script>
import CommentSection from '@/components/posts/CommentSection'

export default {
  name: 'PostPage',
  components: { CommentSection },
  data: () => ({
    post: {},
    isLoading: false,
    comments: []
  }),
  async fetch() {
    await this.getPostData()
    await this.getPostComments()
  },
  computed: {
    getPostDate() {
      return (
        this.$moment
          .unix(this.post.created_at.seconds, 'YYYY-MM-DD')
          .format('DD MMM HH:mm') ||
        this.$moment.utc(this.post.created_at).format('DD MMM HH:mm')
      )
    }
  },
  methods: {
    async getPostData() {
      this.isLoading = true
      const db = this.$firebase.firestore()

      const snap = await db.collection('posts').doc(this.$route.params.id).get()
      if (snap.exists) {
        this.post = snap.data()
      } else {
        console.log('error')
      }
      this.isLoading = false
    },
    async getPostComments() {
      const db = this.$firebase.firestore()
      try {
        const querySnapshot = await db
          .collection('comments')
          .orderBy('created_at', 'desc')
          .where('post_id', '==', this.$route.params.id)
          .get()
        querySnapshot.docs.forEach((doc) => {
          this.comments.push({
            id: doc.id,
            ...doc.data()
          })
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.post {
  overflow-wrap: break-word;
  margin-bottom: 40px;
  padding: 20px;
  width: 100%;
  height: 100%;
  max-width: 600px;

  &__title {
    font-weight: 600;
    font-size: 24px;
  }

  &__cover {
    margin-top: 16px;
    width: 100%;
    height: 200px;
    background-position: center;
    background-size: cover;
  }

  &__body {
    margin-top: 24px;
    text-align: justify;
  }

  &__email {
    display: flex;
    align-items: center;
    margin-left: 16px;
    color: #22345e;

    svg {
      width: 16px;
      height: 12px;
    }
  }

  &__footer {
    justify-content: space-between;
    margin-top: 20px;
    color: rgba(0, 0, 0, 60%);
  }

  &__date {
    margin-top: 16px;
    color: rgba(0, 0, 0, 60%);
  }
}
</style>
