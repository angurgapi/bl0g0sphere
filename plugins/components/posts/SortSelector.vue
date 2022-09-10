<template>
  <div class="sort-selector">
    <span class="sort-selector__title">Сортировать</span>
    <!-- <SortMenu v-model="sort.dateOrder" :options="dateOptions" label="по дате" /> -->
    <SortMenu
      v-model="sort.titleOrder"
      :options="titleOptions"
      label="по заголовку"
      @input="$emit('input', sort.titleOrder)"
    />
  </div>
</template>

<script>
import SortMenu from '@/components/elements/SortMenu'
export default {
  name: 'SortSelector',
  components: { SortMenu },
  data: () => ({
    sort: {
      titleOrder: 'desc'
    },
    // dateOptions: [
    //   {
    //     label: 'Сначала старые',
    //     value: 'asc'
    //   },
    //   {
    //     label: 'Сначала новые',
    //     value: 'desc'
    //   }
    // ],
    titleOptions: [
      {
        label: 'а-я',
        value: 'asc'
      },
      {
        label: 'я-а',
        value: 'desc'
      }
    ]
  })
}
</script>

<style lang="scss" scoped>
.sort-selector {
  display: flex;
  align-items: center;

  &::v-deep .sort-menu {
    margin-left: 16px;
  }
}
</style>
