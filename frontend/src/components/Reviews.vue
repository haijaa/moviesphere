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
  <h2>User reviews</h2>
<div class="review-container" v-if="reviews.length">
<div  v-for="review in reviews">
  <div class="review" >
    <div class="authorRating">
      <h3>{{ review.author }}</h3>
      <i class="fa fa-star"><span class="ratingtext">{{ review.rating }}/5</span></i>
    </div>
    <div class="comment">
     <p>{{ review.comment }}</p>
    </div>
    <div>
  </div>
</div>
</div>
</div>
<div v-else class="noreviews">
 <p>No reviews for this movie yet.</p>
 <p>Add one down here.</p>
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
  margin-top: 20px;
}
.review-container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 20px;
}

.review {
border: double;
margin: 1em;
width: 320px;
padding-left: 20px;
padding-right: 20px;
border-radius: 10px;
box-shadow: #454647 4px 4px;
}

.authorRating {
  display: flex;
justify-content: space-between;
margin-top: 10px;
margin-bottom: 10px;
align-items: baseline;
}

.comment {
  margin-bottom: 10px;
}

.fa-star {
  display: flex;
  font-size:24px;
  color:orange;
  align-items: center;
}
.ratingtext {
  color: black;
  font-size:18px;
  margin-left: 5px;
}


.review-form {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-top: 10px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: #454647 4px 4px;
  position: relative;
  background: linear-gradient(to bottom left, #4f46e5, #805ad5, #a971c2);
}

.review-form h4 {
  margin-bottom: 5px;
  font-size: large;
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
  box-shadow: #454647 4px 4px;
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
  box-shadow: #454647 4px 4px;
  width: 50%;
}

.radiobtn {
  margin-top: 10px;
}

.noreviews {
  margin: 20px;
}

.noreviews p {
  padding: 0;
  margin: 0;
}

@media (min-width: 700px) {
  .review-container {
    flex-direction: row;
  }
  .review-form {
    max-width: 587px;
  }
}

</style>
