<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="login-page">
    <div class="video-wrapper">
      <video src="../../assets/hi2.mp4" autoplay loop muted></video>
    </div>
    <div class="form-wrapper">
      <h2>Welcome Back!</h2>
      <h3 class="h3">Don't have an account yet? <router-link :to="{ name: 'Signup' }">SignUp</router-link> </h3>
    
      <form @submit.prevent="login">
        <div class="forme-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" placeholder="Enter your email">
        </div>
        <div class="forme-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" placeholder="Enter your password">
        </div>
        <el-link class="forget" href="forget" type="primary" @click="forget">
          <router-link :to="{ name: 'Forget' }"></router-link>Forgot Password
        </el-link>
        <button type="submit">Login</button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
    <div class="image-wrapper">
      <img src="../../assets/hi.png" alt="Login Image">
    </div>
    
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      id: '',
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  beforeCreate(){
    if (this.$store.state.account.role!=null){
      this.$router.push('/'+this.$store.state.account.role+'home');
    }
  },
  methods: {
    login() {
      // Make an HTTP POST request to the backend API
      axios
        .post('http://127.0.0.1:8000/login/', {
          email: this.email,
          password: this.password
        })
        .then(Response => {
          // Handle the response from the backend
          const data = Response.data.data;
          console.log(data)

          if (data.is_verified) {
            this.$store.state.account=data
            sessionStorage.setItem('account', JSON.stringify(this.$store.state.account));
            this.$router.push('/'+this.$store.state.account.role+'home');
            
            //this.$router.push('/landing');
          } else{
            // Display the backend-style error message
            this.errorMessage = 'You need to confirm your account via email';
          }
        })
        .catch(error => {
          const er = error.response.data.error
          if (er=='Invalid email or password')
            this.errorMessage = 'Your username or Password are incorrect.';
          else if(er=='this account baned for 2 min')
            this.errorMessage = 'This account is banned for 2 minutes';
        });
        
        console.log(this.$store.state.account)
        console.log(this.id)
        
    },
    forget() {
      // Your forget method code
    }
  }
};
</script>
  
  <style>
  .login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
  }
  
  .video-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  
  .video-wrapper video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .form-wrapper {
    width: 500px;
    height: 480px;
    padding: 40px;
    
    background-color: #fff;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .form-wrapper h3 {
    font-size: 12px;
    margin-bottom: 30px;
  }
  
  .form-wrapper h3 a {
    color: #0062cc;
  }
  
  .forme-group {
    margin-bottom: 20px;
    text-align: left;
  }
  
  .forme-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .forme-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button[type="submit"] {
    display: block;
    margin-top: 20px;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  .error-message {
  color: #ff5050;
  background-color: #ffe6e6;
  border: 1px solid #ff5050;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
}
  .forget {
    color:#007bff;
    left: -10px;
    font-size: 13px;
  }
  
  .el-link {
  margin-right: 300px;
  }
  
  .el-link .el-icon--right.el-icon {
  vertical-align: text-bottom;
  }
  
  button[type="submit"]:hover {
  background-color: #0062cc;
  }
  .image-wrapper {
  position: relative;
  width: 500px;
  height: 480px;
  }
  
  .image-wrapper img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  }
  </style>
  
  