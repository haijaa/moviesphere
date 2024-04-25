<script setup>
import { ref, onMounted } from 'vue';
const directors = ref([])

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
<div class="bg-white">
  <div class="container">
    <h2 class="sr-only">Directors</h2>
    <div class="directors-grid">
      <div v-for="director in directors" :key="director.directorId" class="directors">
        <div class="image-container">
          <img :src="director.directorImg" :alt="director.directorTitle" class="directors-image" />
        </div>
        <div class="directors-details">
          <h3 class="directors-name">{{ director.directorTitle }}</h3>
          <p>{{ director.directorName }}</p>
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

.directors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.directors {
  border: 1px solid #e2e8f0;
  padding: 15px;
}

.image-container {
  overflow: hidden;
  height: 200px;
}

.directors-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.directors-details {
  text-align: center;
}

.directors-name {
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
