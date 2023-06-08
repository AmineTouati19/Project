<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="app">
<div class="navbar">
  <a class="active">Home</a>
  <a href="#">Feedbacks</a>
  <a href="#">Contact</a>
  <a href="Login" @click="logout()">LOGOUT</a>
</div>

<div class="search-container">
  <input type="text" placeholder="Search...">
  <button type="submit">Search</button>
</div>
    <div class="hero">
      <button href="Form" @click="log" class="add-button">
        <router-link :to="{ name: 'Form' }"></router-link><i class="fas fa-plus"></i>
      </button>
    </div>
  </div>
  <div class="squares-container">
    <div class="squares" v-for="(form, index) in forms" :key="index" @click="selectSquare(form)">

    <div class="square">
      <div class="square-image">
        <img :src="form.image" alt="Image">
      </div>
      <div class="square-content">
        <h3>{{ form.name }}</h3>
        <p>{{ form.descreption }}</p>
        <p class="points">.Points: {{ form.points }}</p>
        <p class="max">.Max Team Members: {{ form.max_teamsize }}</p>
        <button class="btn" @click="deleteSquare(index)">Delete</button>
      </div>
    </div>
  </div>
</div>
<div v-if="selectedSquare" class="selected-square">
<div class="square-image">
  <img :src="selectedSquare.image" alt="Image">
</div>
<div class="square-content">
  <h3>{{ selectedSquare.name }}</h3>
  <p>{{ selectedSquare.descreption }}</p>
  <p class="points">Points: {{ selectedSquare.points }}</p>
  <p class="max">Max Team Members: {{ selectedSquare.max_teamsize }}</p>
  <button class="btn" @click="selectedSquare = null">Close</button>
</div>
</div>

</template>

<script>
export default {
  data() {
    return {
      forms: [],
      selectedSquare: null,
    };
  },
  mounted() {
    const forms = JSON.parse(localStorage.getItem('forms'));
    if (forms) {
      this.forms = forms;
    }
  },
  methods: {
    logout() {
              sessionStorage.removeItem('account');
              this.$store.state.account={
                  "id": null,
                  "email": null,
                  "username": null,
                  "role": null,
                  "is_verified": null,
                  "image": null,
                  "skills": null
              };
              this.$router.push('/login');
          },
          log() {
      this.$router.push({name: 'Form'} );
    },
    selectSquare(square) {
this.selectedSquare = square;
},

    deleteSquare(index) {
this.forms.splice(index, 1);
localStorage.setItem('forms', JSON.stringify(this.forms));
this.selectedSquare = null;
},
  },
};
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

* {
margin: 0;
padding: 0;
box-sizing: border-box;
}

.app {
position: relative;
}
.header {
    background-color: #f1f1f1;
    padding: 20px;
    text-align: center;
  }

  /* Style for the navigation bar */
  .navbar {
    overflow: hidden;
    background-color: #333;
  }

  /* Style for the navigation links */
  .navbar a {
    float: left;
    display: block;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  /* Style for the active link */
  .navbar a.active {
  
    background-color: #0062cc;
    color: white;
  }
  .navbar span{
    text-align: center;
  }

  /* Style for the search bar */
  .search-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .search-container input[type=text] {
    padding: 10px;
    width: 300px;
    border: none;
    border-radius: 5px 0 0 5px;
  }

  .search-container button {
    padding: 10px 20px;
    background: #0062cc;
    border: none;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
  }

  .search-container button:hover {
    background: #0062cc;
  }

.add-button {
position: fixed;
bottom: 20px;
right: 20px;
width: 60px;
height: 60px;
border: none;
border-radius: 50%;
background-color: #0062cc;
box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
z-index: 9999;
animation: jump 1s infinite;
transition: background-color 0.3s ease;
}

.add-button:hover {
background-color: #003399;
}

.add-button i {
font-size: 24px;
color: white;
}

@keyframes jump {
0% {
  transform: translateY(0);
}
50% {
  transform: translateY(-12px);
}
100% {
  transform: translateY(0);
}
}

.btn {
background-color: #007bff;
color: white;
padding: 0.5rem 1rem;
border: none;
border-radius: 0.25rem;
cursor: pointer;
}

.btn:hover {
background-color: #0062cc;
color: white;
}

.squares-container {
display: grid;
grid-template-columns: repeat(4, 1fr);
gap: 20px;
margin-top: 15px;
padding: 20px;
}

.square {
width: 250px;
height: 400px;
background-color: #fff;
box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
border-radius: 5px;
overflow: hidden;
display: flex;
flex-direction: column;
transition: transform 0.2s, box-shadow 0.2s;
cursor: pointer;
}

.square:hover {
transform: translateY(-5px);
box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
}

.square-image {
height: 45%;
display: flex;
align-items: center;
justify-content: center;
}

.square-image img {
max-width: 100%;
max-height: 100%;
object-fit: cover;
border-radius: 5px 5px 0 0;
}

.square-content {
padding: 20px;
height: 50%;
display: flex;
flex-direction: column;
justify-content: space-between;
}

h3 {
margin-top: 0;
color: #444;
font-weight: 700;
font-size: 24px;
}

p {
margin-top: 3px;
margin-bottom: 10px;
color: #777;
font-weight: 400;
font-size: 16px;
}

.points {
font-weight: 200;
}

.selected-square {
display: flex;
align-items: center;
justify-content: center;
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.8);
z-index: 9999;
}

.selected-square .square-content {
background-color: #fff;
padding: 30px;
border-radius: 10px;
text-align: left;
box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
max-width: 80%;
}

.selected-square .square-image {
margin-bottom: 20px;
}

.selected-square img {
max-width: 100%;
height: auto;
border-radius: 5px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.selected-square h3 {
font-size: 32px;
margin-bottom: 10px;
color: #333;
}

.selected-square p {
font-size: 20px;
margin-bottom: 15px;
color: #666;
}

.selected-square .points,
.selected-square .max {
font-weight: bold;
color: #888;
}

.selected-square .btn {
background-color: #3f51b5;
color: #fff;
border: none;
padding: 12px 24px;
font-size: 18px;
border-radius: 5px;
cursor: pointer;
transition: background-color 0.3s ease;
}

.selected-square .btn:hover {
background-color: #303f9f;
}



</style>