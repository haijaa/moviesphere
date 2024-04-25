<script setup>
import { ref, onMounted } from 'vue';
const actors = ref([])

function fetchactors() {
fetch('http://localhost:3000/actors')
.then(response => response.json())
.then(data => {
  actors.value = data
})
  }

  fetchactors()
</script>

<template>
<div class="bg-white">
  <div class="container">
    <h2 class="sr-only">Actors</h2>
    <div class="actors-grid">
      <div v-for="actor in actors" :key="actor.actorId" class="actors">
        <div class="image-container">
          <img :src="actor.actorImg" :alt="actor.actorTitle" class="actors-image" />
        </div>
        <div class="actors-details">
          <h3 class="actors-name">{{ actor.actorTitle }}</h3>
          <p>{{ actor.actorName }}</p>
          <p>Born:{{ actor.actorBorn }}</p>
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

.actors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.actors {
  border: 1px solid #e2e8f0;
  padding: 15px;
}

.image-container {
  overflow:hidden ;
  height: 400px;


}

.actors-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.actors-details {
  text-align: center;
}

.actors-name {
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
