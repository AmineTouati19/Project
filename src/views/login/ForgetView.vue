<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="forgot-password-page">
    <div class="video-wrapper">
      <video src="../../assets/hi2.mp4" autoplay loop muted></video>
    </div>
    <div class="form-wrapper">
      <h2>Forgot Password</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="email" type="email" id="email" placeholder="Enter your email">
        </div>
        <button type="submit">Submit</button>
      </form>
      <div class="message" v-if="message">{{ message }}</div> 
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: "",
      message: "",
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post("http://127.0.0.1:8000/restpassword/", {
          email: this.email,
        });
        const data = response.data;
        if (response.status === 200) {
          this.message = data.message;
        } else {
          this.message = data.error;
        }
      } catch (error) {
        this.message = "An error occurred while sending the verification code.";
      }
    },
  },
};
</script>


<style>
.forgot-password-page {
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
  width: 490px;
  padding: 40px;
  
  background-color: #fff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.message
{
  margin-top: 15px;
}

button[type="submit"] {
  display: block;
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #0062cc;
}
</style>
