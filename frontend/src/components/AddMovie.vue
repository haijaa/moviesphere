<template>
  <form @submit.prevent="submitForm">
    <div class="newMovieForm">
      <div class="formColumn">
        <h1>Add A New Movie</h1>
        <div class="imageContainer">
          <img :src="movieImg" alt="No image provided" class="movieImage">
        </div>
        <div>
          <label for="newMovie">Image Link: </label>
          <input id="newMovieImg" type="url" v-model="movieImg">
        </div>
      </div>
      <div class="formColumn">
        <div>
          <label for="newMovie">Movie Title: </label>
          <input id="newMovieTitle" type="text" v-model="movieTitle">
        </div>
        <div>
         <label for="newMovie">Genre:</label>
            <div class="genreRow">
              <input type="radio" id="genre1" value="1" v-model="movieGenre">
                <label for="genre1">Action</label>
              <input type="radio" id="genre3" value="3" v-model="movieGenre">
                <label for="genre3">Comedy</label>
              <input type="radio" id="genre2" value="2" v-model="movieGenre">
                <label for="genre2">Drama</label>
            </div>
            <div class="genreRow">
              <input type="radio" id="genre4" value="4" v-model="movieGenre">
                <label for="genre4">Horror</label>
              <input type="radio" id="genre5" value="5" v-model="movieGenre">
                <label for="genre5">Sci-Fi</label>
            </div>
        </div>
        <div>
          <label for="newMovie">Year: </label>
          <select id="newMovieYear" v-model="movieYear">
            <option v-for="year in years" :value="year">{{ year }}</option>
          </select>
        </div>
        <div>
          <label for="newMovie">Original Language: </label>
          <input id="newMovieLang" type="text" v-model="movieOriginalLanguage">
        </div>

        <div class="actorDiv">
          <label for="newMovie">Lead Actor/Actress</label>
          <select id="newMovieActors" v-model="movieActor">
            <option v-for="actor in actors" :value="actor.actorId">{{actor.actorName}}</option>
          </select>
          <button type="button" @click="submitActor">ADD</button> <!-- Changed to button type -->
        </div>
        <div class="directorDiv">
          <label for="newMovie">Director</label>
          <select id="newMovieDirectors" v-model="movieDirector">
            <option v-for="director in directors" :value="director.directorId">{{director.directorName}}</option>
          </select>
          <button type="button" @click="submitDirector">ADD</button>
        </div>

        <div>
          <label for="newMovie">Description: </label>
          <textarea id="newMovieDesc" rows="5" maxlength="200" v-model="movieDescription"></textarea>
        </div>
        <button type="submit">Submit</button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const movieImg = ref('');
const movieTitle = ref('');
const movieGenre = ref('');
const movieYear = ref('');
const movieOriginalLanguage = ref('');
const movieActors = ref('');
const movieDirector = ref('');
const movieDescription = ref('');

const directors = ref([])
const actors = ref([])
const movieActor = ref('');

const years = ref([]);

onMounted(() => {
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= 1920; year--) {
    years.value.push(year);
  }
});

const submitForm = async () => {
  try {
    console.log('Submitting form...');
    console.log('Movie Image:', movieImg.value);
    const response = await fetch('http://localhost:3000/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        movieTitle: movieTitle.value,
        movieImg:  movieImg.value,
        movieDescription: movieDescription.value,
        movieYear: movieYear.value,
        movieOriginalLanguage: movieOriginalLanguage.value,
        movieGenreId: movieGenre.value,
        movieDirectorId: movieDirector.value,
      }),
    });
    const data = await response.json();
    console.log('Server Response:', data);
    if (response.ok) {
      console.log(data.message);
      window.location.reload();
    } else {
      console.error(data.error);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const submitDirector = async () => {
  let selectedDirectorId = movieDirector.value;

  if (!selectedDirectorId) {
    let newDirectorName = prompt('Enter the name of the new director:');
    let newDirectorImg = prompt('Enter the image link for the new director:');

    try {
      const response = await fetch('http://localhost:3000/director', { // Updated endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          directorName: newDirectorName,
          directorImg: newDirectorImg,
        }),
      });
      const data = await response.json();
      console.log('Server Response:', data);
      if (response.ok) {
        console.log(data.message);
        directors.value.push({ directorId: data.directorId, directorName: newDirectorName });
        window.location.reload();
      } else {
        console.error(data.error);
        return;
      }
    } catch (error) {
      console.error('Error:', error);
      return;
    }
  }
};

const submitActor = async () => {
  let selectedActorId = movieActor.value;

  if (!selectedActorId) {
    let newActorName = prompt('Enter the name of the new actor:');
    let newActorImg = prompt('Enter the image link for the new actor:');

    try {
      const response = await fetch('http://localhost:3000/actors', { // Updated endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          actorName: newActorName,
          actorImg: newActorImg,
        }),
      });
      const data = await response.json();
      console.log('Server Response:', data);
      if (response.ok) {
        console.log(data.message);
        actors.value.push({ actorId: data.actorId, actorName: newActorName });
        window.location.reload();
      } else {
        console.error(data.error);
        return;
      }
    } catch (error) {
      console.error('Error:', error);
      return;
    }
  }
};

function fetchDirectors() {
  fetch('http://localhost:3000/directors')
  .then(response => response.json())
  .then(data => {
    directors.value = data
  })
}

fetchDirectors();

function fetchActors() {
  fetch('http://localhost:3000/actors')
  .then(response => response.json())
  .then(data => {
    actors.value = data
  })
}

fetchActors();

</script>

<style>
.newMovieForm {
  display: flex;
  flex-direction: column;
  max-width: 80%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: #454647 8px 8px;
  position: relative;
  background: linear-gradient(to bottom left, #4f46e5, #805ad5, #a971c2);
}

.formColumn {
  display: flex;
  flex-direction: column;
}

.imageContainer {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.newMovieForm div {
  margin-bottom: 20px;
}

.newMovieForm label {
  margin-right: 5px;
}

.newMovieForm input,
.newMovieForm textarea {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: #454647 8px 8px;
}

.newMovieForm textarea {
  resize: vertical;
}

.newMovieForm button {
  margin-top: auto;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: #454647 8px 8px;
}

.newMovieForm button:hover {
  background-color: #0056b3;
}
.movieImage {
  border-radius: 5px;
  box-shadow: #454647 8px 8px;
  display: block;
  max-width: 50%;
  background-color: white;
  padding: 5px;
}

@media (min-width: 768px) {
  .newMovieForm {
    flex-direction: row;
  }
  .formColumn {
    flex: 1;
    margin-right: 20px;
  }
}

.genreRow {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
.genreRow label {
  margin-right: 10px;
  margin-left: 5px;
  width: 20%;
}
.genreRow input {
width: fit-content;
margin: 0;
box-shadow: #454647 3px 3px;
}
.directorDiv, .actorDiv{
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
.directorDiv button, .actorDiv button {
  height: 30px;
margin-left: 5px;
width: 40%;
padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: #454647 8px 8px;
}
.directorDiv select, .actorDiv select{
  height: 30px;
margin-left: 5px;
width: 40%;
box-shadow: #454647 8px 8px;
}
#newMovieYear{
  box-shadow: #454647 8px 8px;
}
</style>
