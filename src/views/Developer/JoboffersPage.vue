<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <main>
      
      <div v-for="challenge in challenges" :key="challenge.id" class="challenge">
        <img :src="challenge.image_url" />
        <div class="challenge-content">
          <h2 class="challenge-name">{{ challenge.name }}</h2>
          <p class="challenge-description">{{ challenge.descreption }}</p>
          <div class="challenge-info">
            <span class="points">Points: {{ challenge.points }}</span>
            <span class="points">Max team: {{ challenge.max_teamsize }}</span>
            <a href="#" class="participate-btn" @click="showChallengeForm(challenge)" >More info</a>
          </div>
        </div>
      </div>
  
      <transition name="fade">
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <span class="close" @click="closeChallengeForm">&times;</span>
          <img :src="selectedChallenge.image_url" />
          <h2 class="challenge-name">{{ selectedChallenge.name }}</h2>
          <p class="Description" >Description</p>
          <p class="challenge-description1">{{ selectedChallenge.descreption }}</p>
          <p class="challenge1"><span>Start:</span>  {{ displayTime(selectedChallenge.start_date) }}</p>
          <p class="challenge2"><span>End:</span> {{ displayTime(selectedChallenge.end_date) }}</p>
          
          <div class="challenge-info">
            <span class="points">Points: {{ selectedChallenge.points }}</span>
            <span class="points">Max team: {{ selectedChallenge.max_teamsize }}</span>
          </div>
          <template v-if="getTime(selectedChallenge.start_date,selectedChallenge.end_date)=='register'" >
            <button v-if="isRegistered()" class="disabled-btn" >Registered</button>
            <button v-else :class="registerClass" @click="registerForChallenge" :disabled="isDisabled">Register</button>
          </template>
          <button v-else-if="getTime(selectedChallenge.start_date,selectedChallenge.end_date)=='finished'" class="disabled-btn" disabled>Finished</button>
          <template v-else-if="getTime(selectedChallenge.start_date,selectedChallenge.end_date)=='started'" >
            <button v-if="isRegistered()" @click="participate(selectedChallenge.id)" class="register-btn"> participate </button>
            <button v-else class="disabled-btn" disabled> started </button>
          </template>
          
          <!-- Add your form content here -->
          <div v-if="showSuccessMessage" class="success-message">
            You have successfully registered for the challenge.
          </div>
        </div>
        
    
      </div>
  
    </transition>
    
    </main>
  </template>
  
  <script>
  import axios from 'axios';
  import router from '@/router';
  
  export default {
    beforeCreate(){
      if(this.$store.state.account.role!='developer'){
        if(this.$store.state.account.role){
          this.$router.push('/'+this.$store.state.account.role+'/home');}
        else{
          this.$router.push('/login');}
      }
    },
    data() {
      return {
        challenges: [],
        showModal: false,
        selectedChallenge: null,
        showSuccessMessage: false,
        currentTime: "",
        isDisabled: false,
        registerClass: "register-btn"
      };
    },
    mounted() {
      this.fetchChallenges();
      this.getCurrentTime();
      //setInterval(this.getCurrentTime, 1000);
      
    },
    methods: {
      fetchChallenges() {
        axios
          .get('http://127.0.0.1:8000/getplanifiedJob/')
          .then((response) => {
            this.challenges = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      },
      showChallengeForm(challenge) {
        this.selectedChallenge = challenge;
        this.showModal = true;
      },
      closeChallengeForm() {
        this.showModal = false;
        this.registerClass= "register-btn"
        this.isDisabled=false
      },
      registerForChallenge() {
        
        if(this.isRegistered()){
          alert("You are already registered")
          return
        }
        const registrationData = {
          registre_by: this.$store.state.account.id, // Set the user's information for registration here
          challenge: this.selectedChallenge.id // Pass the challenge ID to register for
        };

        axios
          .post('http://127.0.0.1:8000/registre/', registrationData)
          .then(() => {
            // Handle successful registration
            console.log('Registration successful');
            
            this.fetchChallenges();
            this.showSuccessMessage = true;
            this.isDisabled=true;
            this.registerClass= "disabled-btn"
      
           setTimeout(() => {
                  this.showSuccessMessage = false;
                }, 5000);
            // Set 'registered' property to true for the selected challenge
            // Optionally, update the UI or show a success message to the user
          })
          .catch((error) => {
            console.log('User ID:', registrationData.registre_by);
            console.error('Registration error:', error);
            console.log('Response data:', error.response.data);
            console.log('Status code:', error.response.status);
            console.log('Status text:', error.response.statusText);
            // Optionally, show an error message to the user
          });
      },
      getCurrentTime() {
        const now = new Date();
        this.currentTime = now.toISOString();
      },
      getTime(start,end){
        if(this.currentTime < start)
          return "register"
        else{ 
          if (this.currentTime > end)
            return "finished"
          else if (this.currentTime > start && this.currentTime < end)
            return "started"
        }  
      },
      displayTime(Time){
        
        const dateTime = new Date(Time);
        const formattedDateTime = dateTime.toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

        return formattedDateTime;
      },
      isRegistered(){
        const UserId = this.$store.state.account.id;

        const isUserRegistered = this.selectedChallenge.registre.some(
          (registration) => registration.user_detail.id == UserId
        );
        return isUserRegistered
      },
      participate(challengeId){
        router.push({path:'/developer/challenge/'+challengeId})
      }




  }
  };
  </script>
<style scoped>
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f3f3f3;
  }

  main {
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .challenge {
    width: calc(33.33% - 20px);
    margin-bottom: 30px;
    background-color: #fff;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    overflow: hidden;
    transition: transform 0.3s ease;
  }

  .challenge:hover {
    transform: translateY(-5px);
  }

  .challenge img {
    width: 100%;
    display: block;
    object-fit: cover;
    height: 200px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .challenge-content {
    padding: 20px;
  }

  h2 {
    font-size: 24px;
    margin: 0 0 10px 0;
  }

  p {
    margin: 0;
    line-height: 1.6;
  }

  .challenge-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
  }

  .points {
    font-size: 16px;
    color: #555;
  }

  .team {
    font-size: 16px;
    color: #555;
  }

  .participate-btn {
    display: inline-block;
    padding: 10px 20px;
    background-color: #1d2c4f;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }

  .participate-btn:hover {
    background-color: #162244;
  }

  .success-message {
    margin-top: 5px;
    background-color: #32a852;
    color: #fff;
    padding: 10px;
    text-align: center;
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.667);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-content {
    width: 100%;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    max-width: 600px;
    text-align: left;
  }
  .modal-content .challenge1
  {
    font-size: 22px;
  }
  .modal-content .challenge2
  {
    font-size: 22px;
  }
  .modal-content .challenge1 span
  {
    font-size: 22px;
  }
  .modal-content .challenge2 span
  {
    font-size: 22px;
    color: red;
  }

  .modal-content img {
    width: 100%;
    display: block;
    object-fit: cover;
    height: 200px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .modal-content .Description
  {
    color: black;
    font-size: 21px;
  }
  .modal-content h2 {
    font-size: 24px;
    margin: 0 0 10px 0;
  }

  .modal-content p {
    margin: 0;
    line-height: 1.6;
  }

  span
  {
    color: #162244;
  }

  .close {
    position: absolute;
    top: 2px;
    right: 5px;
    font-size: 24px;
    color: #aaa;
    cursor: pointer;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1.2s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .register-btn {
    display: inline-block;
    padding: 10px 20px;
    background-color: #1d2c4f;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    margin-top: 10px;
  }

  .disabled-btn {
    display: inline-block;
    padding: 10px 20px;
    background-color: #ffffff;
    color: #1d2c4f;
    border: #1d2c4f solid;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    margin-top: 10px;
  }

  .register-btn:hover {
    background-color: #162244;
  }
</style>