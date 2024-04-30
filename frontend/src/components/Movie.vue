<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from 'vue-router'

const route = useRoute()
const movie = ref({})


function fetchMoviesById () {
  fetch(`http://localhost:3000/movie/${route.params.movieId}`)
  .then(response => response.json())
  .then(data => {
    movie.value = data
  })
}

fetchMoviesById()


</script>
<template>
    <div v-if="movie.length">
       <h1> {{ movie[0].movieTitle }} </h1>
       <img :src="movie[0].movieImg" :alt="movie[0].movieTitle" class="movies-image" />
       <p class="categoryText"> Description: </p>
       <p>{{ movie[0].movieDescription }}</p>
       <p class="categoryText"> Released: </p>
       <p>{{ movie[0].movieYear }} </p>
       <p class="categoryText"> Director: </p>
       <p>{{ movie[0].directorName}}</p>
       <p class="categoryText"> Genres: </p>
       <p>{{ movie[0].genreName }} </p>
    </div>
    <div v-else>
        Loading...
    </div>
</template>


<style scoped>
.movies-image {
    height: 250px;
    width: 150px;
}
.categoryText {
    font-style: italic;
    font-weight: bold;
}
</style>