<script setup>
import { ref, onMounted } from 'vue';
const movies = ref([])

function fetchMovies() {
fetch('http://localhost:3000/movies')
.then(response => response.json())
.then(data => {
  movies.value = data
})
  }
fetchMovies()
</script>

<template>
<div class="bg-white">
  <div class="container">
    <h2 class="sr-only">Movies</h2>
    <div class="movies-grid">
      <div v-for="movie in movies" :key="movie.movieId" class="movies">
        <div class="image-container">
          <img :src="movie.movieImg" :alt="movie.movieTitle" class="movies-image" />
        </div>
        <div class="movies-details">
          <h3 class="movies-name">{{ movie.movieTitle }}</h3>
          <p>{{ movie.movieDescription }}</p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style>
.bg-white {
  background-color: #fff;
}

.container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 15px;
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.movies {
  border: 1px solid #e2e8f0;
  padding: 15px;
}

.image-container {
  overflow: hidden;
  height: 250px;
}

.movies-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.movies-details {
  text-align: center;
}

.movies-name {
  margin-bottom: 10px;
}

.rating {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
}

.star {
  color: #fbbf24;
}

.star.filled {
  color: #000;
}

.review-count {
  margin-left: 5px;
}

.price {
  font-weight: bold;
}

</style>
