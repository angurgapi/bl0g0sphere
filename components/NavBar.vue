<template>
  <div class="navbar f-row">
    <nuxt-link class="navbar__link" to="/">
      <svg-icon name="home" height="20" width="20" />bl0g0sphere
    </nuxt-link>
    <div class="navbar__right f-row">
      <nuxt-link class="navbar__link" to="/create">
        <svg-icon name="pencil" height="20" width="20" />Добавить новость
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>
