<template>
  <div class="page">
    <h2 class="section-title">
      <span>загрузите файлы</span>
    </h2>
    <DropzoneWidget v-model="files" />
  </div>
</template>

<script>
import DropzoneWidget from '@/components/elements/DropzoneWidget'

export default {
  name: 'DropzonePage',
  components: { DropzoneWidget },
  data: () => ({
    files: []
  }),
  head: {
    script: [{ src: '/js/sortable.min.js', defer: true }]
  }
}
</script>
