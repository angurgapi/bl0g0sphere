<template>
  <div class="feed">
    <div class="feed__posts">
      <ul class="feed__list">
        <li v-for="post in posts" :key="post.id">
          <ListingPost :post="post" @getAll="getPostsByAuthor" />
        </li>
      </ul>
    </div>
    <Pagination
      :totalPages="getTotalPages"
      :currentPage="pagination.currentPage"
    />
  </div>
</template>

<script>
import ListingPost from './ListingPost'
import Pagination from './Pagination.vue'

export default {
  name: 'Feed',
  components: { ListingPost, Pagination },

  //   async asyncData({ app }) {
  //     const db = app.$firestore()
  //     const postCollection = db.collection('posts')
  //     try {
  //       const postList = postCollection.orderBy('title', 'desc').limit(10).get()

  //       return {
  //         posts: postList
  //       }
  //     } catch (e) {
  //       console.error(e)
  //     }
  //   },
  data: () => ({
    posts: [],
    pagination: {
      total: 0,
      currentPage: 1,
      per_page: 10
    }
  }),
  async fetch() {
    await this.loadPosts()
  },
  computed: {
    getTotalPages() {
      return Math.ceil(this.pagination.total / this.pagination.per_page)
    }
  },
  methods: {
    async loadPosts() {
      const db = this.$firebase.firestore()

      const querySnapshot = await db
        .collection('posts')
        .orderBy('title', 'desc')
        .limit(this.pagination.per_page)
        .get()
      this.pagination.total = querySnapshot.size
      querySnapshot.forEach((doc) => {
        this.posts.push({
          id: doc.id,
          ...doc.data()
        })
      })
      console.log(this.posts)
    },
    async getPostsByAuthor(author) {
      const db = this.$firebase.firestore()
      const querySnapshot = await db
        .collection('posts')
        .where('author', '==', author)
        .orderBy('title', 'desc')
        .get()
      this.posts = []
      querySnapshot.forEach((doc) => {
        this.posts.push({
          id: doc.id,
          ...doc.data()
        })
      })
      console.log(author)
    }
  }
}
</script>

<style lang="scss" scoped>
.feed {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;

  &::v-deep .pagination {
    margin-top: 30px;
  }
}
</style>
