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
nav{
  display:flex;
  justify-content:space-around;
  background-color: #a971c2;
  color: white;
  padding: 10px;
  margin: 0;
}
a:visited {
  color: white;
}
a:link {
  color: white;
}
</style>
