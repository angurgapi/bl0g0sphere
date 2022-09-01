<template>
  <div class="wrapper">
    <NavBar />
    <div class="wrapper__content">
      <Nuxt />
    </div>
    <FooterBlock />
    <client-only> </client-only>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import FooterBlock from '@/components/FooterBlock.vue'

export default {
  components: { NavBar, FooterBlock }
}
</script>

<style lang="scss">
.wrapper {
  background-color: rgba(241, 242, 244, 80%);
}
</style>
