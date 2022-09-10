<template>
  <div class="pagination">
    <template v-if="!loadMore">
      <div class="pagination__pages">
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
    <template v-else>
      <button class="btn pagination__more" @click="$emit('more')">Еще</button>
    </template>
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
    loadMore: {
      type: Boolean,
      default: false
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
  &__pages {
    display: inline-grid;
    align-items: center;
    grid-gap: 16px;
    grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
    margin: auto;
    min-width: 300px;
  }

  &__more {
    border-radius: 0 0 10px 10px;
    width: 100%;
    background-color: rgb(25, 28, 31);

    &:hover {
      opacity: 0.8;
    }
  }

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
