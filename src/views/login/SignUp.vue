<template>
  <div class="signup-page">
    <div class="video-wrapper">
      <video src="../../assets/hi2.mp4" autoplay loop muted></video>
    </div>
    <div class="signup-form">
      <h2>Sign Up</h2>
      <form @submit.prevent="signup">
        <div class="form-group">
          <label for="name">Full Name</label>
          <input type="text" id="name" v-model="name" name="name" required>
        </div>
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" name="username" required>
        </div>
        <div class="form-group">
  <label for="role">Role</label>
  <select id="role" v-model="role" name="role" required>
    <option value="" disabled></option>
    <option value="Developer">Developer</option>
    <option value="Company">Company</option>
  </select>
</div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" name="email" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" name="password" required>
        </div>
        <div class="form-group">
          <label for="confirm-password">Confirm Password</label>
          <input type="password" id="confirm-password" name="confirm-password" required>
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <div class="or">
        <hr>
        <span>Or Sign Up With</span>
        <hr>
      </div>
      <div class="social-auth">
        <button class="google-auth"><i class="fab fa-google"></i> Sign up with Google</button>
        <button class="facebook-auth"><i class="fab fa-facebook"></i> Sign up with Facebook</button>
        <button class="github-auth"><i class="fab fa-github"></i> Sign up with Github</button>
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      username: '',
      role: '',
      email: '',
      password: '',
      otp: '', // Add a new property for OTP
    };
  },
  methods: {
    signup() {
      // Create a new user account
      axios
        .post('http://127.0.0.1:8000/create/', {
          name: this.name,
          username: this.username,
          role: this.role,
          email: this.email,
          password: this.password,
        })
        .then(response => {
          // Handle the successful sign-up response here
          console.log(response.data);
          // Redirect the user to the OTP verification page
          // Pass the email to the verification page
          this.$router.push({ name: 'verification', params: { email: this.email } });
        })
        .catch(error => {
          // Handle any errors that occurred during sign-up
          console.error(error);
        });
    },
  },
};
</script>

<style>
    .signup-form {
      background: #fff;
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      max-width: 600px;
      margin: 50px auto;
      padding: 40px;
      text-align: center;
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
  
  .signup-form select {
    font-size: 16px;
    font-weight: 500;
    display: block;
    width: 104%;
    padding: 10px;
    margin-bottom: 20px;
    border: none;
    border-radius: 5px;
    background-color: #f8f8f8;
     /* Remove default arrow */
    
  }

  .signup-form select::-ms-expand {
    display: none; /* Remove default arrow in IE */
  }

  .signup-form select option {
    font-weight: 500;
  }
    .signup-form h2 {
      margin-bottom: 30px;
      font-size: 32px;
      font-weight: 600;
      color: #333;
    }
    
    .signup-form p {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 20px;
      color: #666;
    }
    
    .signup-form label {
      font-size: 16px;
      font-weight: 500;
      display: inline-block;
      margin-bottom: 10px;
      color: #333;
      text-align: left;
      width: 100%;
    }
    
    .signup-form input[type="text"],
    .signup-form input[type="email"],
    .signup-form input[type="password"] {
      font-size: 16px;
      font-weight: 500;
      display: block;
      width: 100%;
      padding: 10px;
      margin-bottom: 20px;
      border: none;
      border-radius: 5px;
      background-color: #f8f8f8;
    }
    
    .signup-form button[type="submit"] {
      display: inline-block;
      background-color: #008CBA;
      color: #fff;
      font-size: 18px;
      font-weight: 500;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    
    .signup-form button[type="submit"]:hover {
      background-color: #005d79;
    }
    .or {
      margin: 20px 0;
      display: flex;
      align-items: center;
    }
    
    .or hr {
      flex-grow: 1;
      height: 1px;
      background-color: #ccc;
      margin: 0 10px;
    }
    
    .or span {
      font-size: 16px;
      font-weight: bold;
      color: #555;
    }
    
    .social-auth {
      margin-top: 40px;
    }
    
    .social-auth button {
      display: inline-block;
      background-color: #fff;
      color: #333;
      font-size: 16px;
      font-weight: 500;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
      margin-right: 10px;
    }
    
    
    .google-auth{
      color: #db4a39;
      border: 1px solid #db4a39;
    }
    
    .google-auth:hover {
      background-color: #db4a39;
      color: #fff;
    }
    
    .facebook-auth {
      color: #3b5998;
      border: 1px solid #3b5998;
    }
    .facebook-auth:hover {
      background-color: #3b5998;
      color: #fff;
    }
    
    .github-auth{
      color: #333;
      border: 1px solid #333;
    }
    
    .github-auth:hover {
      background-color: #333;
      color: #fff;
    }
    
    
    </style>