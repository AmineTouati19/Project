<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="form-container">
      <div class="video-wrapper">
        <video src="@/assets/ji.mp4" autoplay loop muted></video>
      </div>
      <h1>Upload a Form</h1>
      <div class="form">      
        <div class="form-group">  
          <label for="image">Image:</label>
          <div class="upload-btn-wrapper">
            <input type="file" ref="image" accept="image/*" @change="previewImage" />
          </div>
          <div class="preview" v-if="previewUrl">
            <img :src="previewUrl" alt="Preview Image" class="preview-image" />
          </div>
          <div class="preview" v-else>
            <i class="fas fa-image"></i>
            <span>Click to select an image</span>
          </div>
        </div>
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="name" />
        </div>
        <div class="form-group">
          <label for="descreption">Description:</label>
          <textarea id="descreption" v-model="descreption"></textarea>
        </div>
      
        <button class="next-btn" @click="saveForm">Next</button>
      
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        image: '',
        previewUrl: null,
        name: '',
        descreption: '',
      }
    },
    methods: {
  
      previewImage() {
        const file = this.$refs.image.files[0]
        if (file) {
          this.previewUrl = URL.createObjectURL(file)
          this.image = file
        }
      },
      saveForm() {
        if (!this.image || !this.name || !this.descreption) {
          alert('Please fill in all fields.')
          return
        }
        const formData = new FormData();
        formData.append('image', this.image);
        formData.append('name', this.name);
        //formData.append('descreption', this.descreption);
  
        axios.post('http://127.0.0.1:8000/createlearningpath/', formData)
          .then(response => {
             const pathId = response.data.id;
             console.log(pathId)
        // Pass the challengeId to the tasks page
          })
          .catch(error => {
            console.log(error);
          })  
  
        const forms = JSON.parse(localStorage.getItem('forms')) || []
        forms.push({ image: this.previewUrl, name: this.name, descreption: this.descreption, points: this.points, max_teamsize: this.max_teamsize })
        localStorage.setItem('forms', JSON.stringify(forms))
  
      }
    }
  }
  </script>
  
  <style scoped>
  .form-container {
    width: 1000px;
    margin: 0 auto;
    padding: 50px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    
  
  h1 {
    margin-bottom: 20px;
    font-size: 42px;
    color: #fff;
    text-align: center;
  }
  
  .form {
    width: 100%;
    max-width: 800px;
    background-color: #fff;
    border-radius: 10px;
    padding: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    width: 100%;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
  }
  
  label {
    font-weight: 600;
    font-size: 20px;
    color: #333;
    margin-bottom: 10px;
  }
  
  input,
  textarea {
    width: 100%;
    padding: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 18px;
    color: #333;
    resize: vertical;
  }
  
  .upload-btn-wrapper {
    position: relative;
    overflow: hidden;
    display: inline-block;
    margin-bottom: 20px;
  }
  
  .upload-btn {
    border: none;
    outline: none;
    padding: 16px 32px;
    font-size: 18px;
    font-weight: 600;
    color: #fff;
    background-color: #ff6f00;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .upload-btn::before {
    content: "+";
    font-size: 24px;
    margin-right: 8px;
  }
  
  .upload-btn:hover {
    background-color: #ff8f00;
    transform: scale(1.05);
  }
  
  .preview {
    width: 100%;
    height: 300px;
    border: 1px solid #ccc;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-bottom: 30px;
    overflow: hidden;
  }
  
  .preview-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .preview i {
    font-size: 96px;
    color: #ccc;
  }
  
  .preview span {
    position: absolute;
    bottom: 16px;
    font-size: 18px;
    color: #555;
  }
  
  .next-btn {
    border: none;
    outline: none;
    padding: 16px 32px;
    font-size: 18px;
    font-weight: 600;
    color: #fff;
    background-color: #007aff;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    border-radius: 8px;
    margin-top: 30px;
  }
  
  .next-btn:hover {
    background-color: #1565c0;
  }
  </style>
  