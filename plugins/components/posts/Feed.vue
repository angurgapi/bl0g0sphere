<template>
  <div class="feed">
    <SortSelector v-if="posts.length" v-model="sort.title" @input="loadPosts" />
    <template v-if="isLoading">
      <div class="loading"></div>
    </template>
    <template v-else>
      <div class="feed__posts">
        <ul class="feed__list">
          <li v-for="post in posts" :key="post.id">
            <ListingPost :post="post" @getAll="getPostsByAuthor" />
          </li>
        </ul>
      </div>
      <Pagination
        loadMore
        :totalPages="getTotalPages"
        :currentPage="pagination.currentPage"
        @more="loadMore"
      />
    </template>
  </div>
</template>

<script>
import ListingPost from './ListingPost'
import Pagination from './Pagination.vue'
import SortSelector from './SortSelector'

export default {
  name: 'Feed',
  components: { ListingPost, Pagination, SortSelector },

  data: () => ({
    isLoading: false,
    posts: [],
    pagination: {
      total: 0,
      currentPage: 1,
      per_page: 10
    },
    sort: {
      //   created_at: 'desc',
      title: 'asc'
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
      this.isLoading = true
      const db = this.$firebase.firestore()

      this.posts = []

      const querySnapshot = await db
        .collection('posts')
        .orderBy('title', this.sort.title)
        .limit(this.pagination.per_page)
        .get()
      this.pagination.total = querySnapshot.size

      querySnapshot.forEach((doc) => {
        this.posts.push({
          id: doc.id,
          ...doc.data()
        })
      })
      this.isLoading = false
    },

    loadMore() {
      this.pagination.per_page += 10
      this.loadPosts()
    },

    async getPostsByAuthor(author) {
      const db = this.$firebase.firestore()
      try {
        const querySnapshot = await db
          .collection('posts')
          .where('author', '==', author)
          .orderBy('title', 'desc')
          .get()

        this.posts = []
        querySnapshot.docs.forEach((doc) => {
          this.posts.push({
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
.feed {
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  width: 100%;
  max-width: 600px;

  &::v-deep .pagination {
    margin-top: 30px;
  }
}
</style>
