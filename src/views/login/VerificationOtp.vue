<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="email-verification-page">
    <div class="video-wrapper">
      <video src="../../assets/hi2.mp4" autoplay loop muted></video>
    </div>
    <div class="verification-card">
      <h2 class="title">Verify Your Email</h2>
      <form @submit.prevent="verifyOTP">
        <div class="form-group">
          <label for="otp" class="label">Enter OTP</label>
          <input type="text" id="otp" name="otp" v-model="otp" class="input" required>
        </div>
        <button type="submit" class="button">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      otp: '', // Add a new property for OTP
    };
  },
  methods: {
    verifyOTP() {
      const email = this.$route.params.email; // Get the email from the route parameter
      
      // Send the OTP and email to the backend for verification
      axios
        .post('http://127.0.0.1:8000/verifyotp/', {
          email: email,
          otp: this.otp,
        })
        .then(response => {
          // Handle the successful verification response here
          console.log(response.data);
          this.$router.push('/login');
        })
        .catch(error => {
          // Handle any errors that occurred during verification
          console.error(error);
        });
    },
  },
};
</script>

  
<style>
.email-verification-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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


.verification-card {
  width: 480px;
  padding: 40px;
  border-radius: 6px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.title {
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.label {
  display: block;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  text-align: center;
  font-size: 30px;
}

.button {
  display: block;
  width: 25%;
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #0056b3;
}
</style>
