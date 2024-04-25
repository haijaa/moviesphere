<script setup>
import { RouterLink, RouterView } from 'vue-router'


</script>

<template>
  <header>


      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/movies">Movies</RouterLink>
        <RouterLink to="/directors">Directors</RouterLink>
      </nav>
  </header>
  <RouterView />
  <directors />
</template>

<style scoped>

</style>
