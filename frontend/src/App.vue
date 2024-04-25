<script setup>
import { RouterLink, RouterView } from 'vue-router'
import SearchBar from './components/SearchBar.vue';


</script>

<template>
  <header>
    <SearchBar />
  </header>
  <RouterView />
  <directors />
</template>

<style scoped>

</style>

