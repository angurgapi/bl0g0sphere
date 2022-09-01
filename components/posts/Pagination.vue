<template>
  <div class="pagination">
    <button
      v-for="(number, index) in totalPages"
      :key="index"
      class="pagination__button f-column"
      :class="{
        'pagination__button--current': number === currentPage
      }"
      @click="getPage(number)"
    >
      {{ number }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    totalPages: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  methods: {
    getPage(pageNum) {
      this.$emit('inputPage', pageNum)
      window.scrollTo({
        top: 0
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  display: inline-grid;
  align-items: center;
  grid-gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
  margin: auto;
  min-width: 300px;

  &__button {
    align-items: center;
    border: 1px solid #d8e2ed;
    border-radius: 50%;
    padding: 10px;
    width: 40px;
    height: 40px;

    &:hover {
      background-color: rgba(25, 28, 31, 20%);
    }

    &--current {
      color: #fff;
      background-color: rgb(25, 28, 31);
    }
  }

  @media (max-width: 600px) {
    grid-gap: 10px;
  }
}
</style>
