<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const movie = ref({});

function fetchMoviesById() {
  fetch(`http://localhost:3000/movie/${route.params.movieId}`)
    .then((response) => response.json())
    .then((data) => {
      movie.value = data;
    });
}
fetchMoviesById();
</script>
<template>
  <main>
    <div class="container">
      <div v-if="movie.length" class="movieCard-container">
        <div class="provarbara">
          <img
            :src="movie[0].movieImg"
            :alt="movie[0].movieTitle"
            class="movies-image"
          />
          <div class="movieCard-information">
            <h1>{{ movie[0].movieTitle }}</h1>

            <p class="descriptionText">{{ movie[0].movieDescription }}</p>

            <p class="categoryText">Released:</p>
            <p>{{ movie[0].movieYear }}</p>

            <p class="categoryText">Genres:</p>
            <p>{{ movie[0].genreName }}</p>
          </div>
        </div>

        <div class="cast-container">
          <div class="director-container">
            <p class="categoryText">Director:</p>
            <img
              :src="movie[0].directorImg"
              :alt="movie[0].directorName"
              class="directorImage"
            />
            <p>{{ movie[0].directorName }}</p>
          </div>

          <div class="actor-container">
            <p class="categoryText">Lead actor:</p>
            <img
              :src="movie[0].actorImg"
              :alt="movie[0].actorName"
              class="directorImage"
            />
            <p>{{ movie[0].actorName }}</p>
          </div>
        </div>
      </div>
      <div v-else>Loading...</div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
}
.container {
  display: flex;
  justify-content: center;
}
.provarbara {
  display: flex;
}
.movieCard-container {
  display: flex;
  padding: 20px;
  width: 50%;
  flex-direction: column;
}
.categoryText {
  padding-top: 15px;
  font-weight: bold;
}
.movies-image {
  max-height: 480px;
  max-width: 300px;
}
.movieCard-information {
  display: flex;
  flex-direction: column;
  padding-left: 40px;
}
.directorImage {
  height: 150px;
  width: 150px;
}
.cast-container {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}

* {
  padding: 0;
  margin: 0;
}
</style>
