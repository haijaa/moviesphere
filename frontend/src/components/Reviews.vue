<script setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';




const reviews = ref([])
const route = useRoute()
const author = ref('')
const comment = ref('')
const rating = ref('')


function fetchReviews() {
fetch(`http://localhost:3000/movie/${route.params.movieId}/reviews`)
.then(response => response.json())
.then(data => {
  reviews.value = data;
  console.log(reviews.value);
        })
        .catch(error => {
            console.error('Error fetching reviews:', error);
        });
      }

fetchReviews()

const submitRatingForm = async () => {
  try {
    const response = await fetch('http://localhost:3000/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        author: author.value,
        comment: comment.value,
        movieId: route.params.movieId,
        rating: rating.value,
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


</script>
<template>

<div class="gigacontainer">
<div class="review-container" v-if="reviews.length">
<div  v-for="review in reviews">
  <div class="review" >
    <div >
      <h3>{{ review.author }}</h3>
    <div>
     <p>{{ review.comment }}</p>
    </div>
    <div>
      <p> Rating: {{ review.rating }}</p>
    </div>
  </div>
</div>
</div>
</div>

<div v-else>
  No reviews for this movie yet :( 
    <br>
  Add one down here.
</div>


<form @submit.prevent="submitRatingForm" class="review-form">
 <h4> What do you think of this movie?</h4>
 <div class="formColumn">
  <label class="label">Name:</label>
  <input class="field-style" type="text" v-model="author">
</div>
<div class="formColumn">
  <label class="label">Review:</label>
  <textarea class="field-style"   rows="5" maxlength="200" v-model="comment"></textarea>
</div>
  <div class="radiobtn">
    <label class="label">Rating:</label>
  <label>
   <input checked v-model="rating" type="radio" value="1" />1</label>
   <label> <input v-model="rating" type="radio" value="2" />2 </label>
   <label> <input v-model="rating" type="radio" value="3" />3 </label>
   <label> <input v-model="rating" type="radio" value="4" />4 </label>
   <label> <input v-model="rating" type="radio" value="5" />5 </label>
  </div>
  <button type="submit">Submit review</button>
</form>
</div>


</template>
<style scoped>
.gigacontainer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.review-container {
  display: flex;
  flex-direction: column;
  /* align-items: center; */

}

.review {
border: solid;
margin: 1em;
max-width: 375px;
padding-left: 20px;
}

.review-form {
  display: flex;
  flex-direction: column;
  width: 30%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: #454647 8px 8px;
  position: relative;
  background: linear-gradient(to bottom left, #4f46e5, #805ad5, #a971c2);
}

.formColumn {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

}
.field-style {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: #454647 8px 8px;
}

.label {
  margin: 5px;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #0b36f6;
  color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: #454647 8px 8px;
  width: 50%;
}

.radiobtn {
  margin-top: 10px;
}


@media (min-width: 700px) {
  .review-container {
    flex-direction: row;
  }
}

</style>
