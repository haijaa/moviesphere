<script setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';

const reviews = ref([])
const route = useRoute()


fetchRevies()

function fetchRevies() {
fetch(`http://localhost:3000/movies/${route.params.movieId}`)
.then(response => response.json())
.then(data => {
  reviews.value = data
})
  }

</script>
<template>
 <div v-if="reviews.length">

</div>
 <div v-else></div>
</template>
