<script setup>
import { ref, onMounted } from "vue";
const movies = ref([]);

function fetchMovies() {
  fetch("http://localhost:3000/")
    .then((response) => response.json())
    .then((data) => {
      movies.value = data;
    });
}
fetchMovies();
</script>

<template>
  <div class="bg-white">
    <div class="container">
      <h2 class="sr-only">Movies</h2>
      <div class="movies-grid">
        <div
          v-for="movie in movies"
          :key="movie.movieId"
          class="movies"
          @click="$router.push(`/movie/${movie.movieId}`)"
        >
        <img
              :src="movie.movieImg"
              :alt="movie.movieTitle"
              class="movies-image"
            />
          <div class="movies-details">
            <h3 class="movies-name">{{ movie.movieTitle }}</h3>
            <p>{{ movie.movieDescription }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-white {
  background-color: #fff;
}

.container {
  max-width: 950px;
  margin: 0 auto;
  padding: 0 15px;
  text-align: center;
  margin-top: 40px;
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 60px;
}
.movies-grid:hover {
  cursor: pointer;
}

.movies {
  border: 2px solid white;
}

.movies:hover {
  color: #4f46e5;
}

.movies-image {
  width: 100%;
  height: 400px;
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

/* * {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  margin: 0;
  padding: 0;
} */
</style>
