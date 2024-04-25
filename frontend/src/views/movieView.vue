<script setup>
import { ref } from 'vue';
import Movies from '../components/Movies.vue';

const movies = ref([])
const directors = ref([])


function fetchMovies() {
fetch('http://localhost:3000/movies')
.then(response => response.json())
.then(data => {
  movies.value = data
})
  }
fetchMovies()

function fetchDirectors() {
fetch('http://localhost:3000/directors')
.then(response => response.json())
.then(data => {
  directors.value = data
})
  }

  fetchDirectors()

</script>
<template>
<main>
  <h1>MOVIES</h1>
  <div>
  <ul>
  <li v-for="movie in movies"> {{ movie.movieTitle }} </li>
</ul>
</div>
<div>
  <ul>
  <li v-for="director in directors">{{ director.directorImg }} </li>
</ul>
</div>
<Movies />
</main>
</template>
