<template>
    <div>
        <header>
    <h1>Learning Paths</h1>
  </header>
  
   <nav>
    <ul>
      <li><a href="#" class="active" data-path="beginner">Beginner</a></li>
      <li><a href="#" data-path="intermediate">Intermediate</a></li>
      <li><a href="#" data-path="advanced">Advanced</a></li>
    </ul>
  </nav> 
  
    <main>
      <section  id="beginner-path" v-for="path in paths" :key="path.id">
        <div class="content-block">
          <div class="image-container">
            <img :src="path.image" alt="Beginner Path">
          </div>
          <div class="content">
            <!-- <router-link :to="{ name: 'Login' }"></router-link> -->
            <router-link :to="{ name: 'GamifiedCourses', params: { id: path.id } }"><h2>{{ path.name  }}</h2></router-link>
            <p>{{ path.descreption  }}</p>
            <a href="#" class="learn-more">Learn More</a>
          </div>
        </div>
      </section>
      
    </main>
    <div class="popup-overlay"></div>
    <div class="popup">
                <div class="popup-content">
                    <h3> introduction to cybersecurity </h3>
                    <p> The beginner's path is characterized by exploration, experimentation, and a strong emphasis on building a strong foundation. It requires patience, persistence, and a willingness to learn from mistakes. Beginners are encouraged to take small steps, set achievable goals, and gradually challenge themselves as they gain confidence and competence.</p>
                    <h4>what you gonna learn on this path?</h4>
                    <ul>
                        <li>Set Clear Goals: Clearly define what you want to achieve in your chosen field.</li>
                        <li>Embrace the Learning Process: Understand that learning is a continuous process and that making mistakes is an integral part of it</li>
                        <li>Find Reliable Resources: Seek out high-quality and reputable resources such as textbooks, online tutorials, courses, or mentors</li>
                        <li>Set Clear Goals: Clearly define what you want to achieve in your chosen field.</li>
                        <li>Embrace the Learning Process: Understand that learning is a continuous process and that making mistakes is an integral part of it</li>
                        <li>Find Reliable Resources: Seek out high-quality and reputable resources such as textbooks, online tutorials, courses, or mentors</li>
                        <li>Set Clear Goals: Clearly define what you want to achieve in your chosen field.</li>
                    
                    
                    </ul>
                     <a href="#" class="close-popup">Close</a>
                </div>
    </div>
  </div>
  </template>
  
  <script>
  //  import axios from 'axios';
  export default {
    beforeCreate(){
      this.$store.dispatch('GetPaths');
    },
    data(){
      return{

      }
    },
    computed: {
      paths() {
        return this.$store.state.Paths;
      },
    },
    beforeMount(){
      this.$store.dispatch('GetPaths');
      console.log(this.$store.state.Paths)
    }
  }
  </script>
  
 <style scoped>
 /* Reset some default styles */
body, h1, h2, p, ul, li {
    margin: 0;
    padding: 0;
  }
  
  /* Set basic styles */
  body {
    font-family: Arial, sans-serif;
    background-color: #f1f1f1;
  }
  
  header {
    background-image: linear-gradient(to bottom right, #112d68, #1952a2);
    background-size: cover;
    background-position: center;
    color: #fff;
    padding: 60px;
    text-align: center;
  }
  
  header h1 {
    margin: 0;
    font-size: 60px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  }
  
  nav ul {
    list-style-type: none;
    padding: 10px;
    text-align: center;
    border-radius: 5px;
    margin-top: 0px;
  }
  
  nav ul li {
    display: inline;
    margin-right: 10px;
  }
  
  nav ul li a {
    text-decoration: none;
    color: #333;
    padding: 8px 16px;
    border-radius: 3px;
    transition: background-color 0.3s;
  }
  
  nav ul li a:hover {
    background-color: #1952a2;
    color: #fff;
  }
  
  main {
    margin: 20px;
  }
  
  section {
    background-color: #fff;
    padding: 30px;
    margin-bottom: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
  }
  
  section:hover {
    transform: translateY(-5px);
  }
  
  section h2 {
    margin-bottom: 15px;
    font-size: 32px;
    color: #1952a2;
  }
  
  section p {
    margin-bottom: 20px;
    line-height: 1.6;
  }
  
  section a {
    cursor: pointer;
    color: #fff;
    padding: 12px 24px;
    text-decoration: none;
    display: inline-block;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  section a h2 
  {
    margin-left: -20px;
  }
 
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    display: none;
  }
  
  .popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    max-width: 90%;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    display: none;
  }
  
  .popup-content {
    text-align: left;
  }
  
  .popup h3 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .popup p {
    margin-bottom: 20px;
    line-height: 1.6;
  }
  
  .popup h4 {
    font-size: 18px;
    margin-bottom: 20px;
  }
  
  .popup ul {
    list-style-type: disc;
    margin-bottom: 20px;
    padding-left: 20px;
    text-align: left;
  }
  
  .popup ul li {
    margin-bottom: 25px;
  }
  
  .popup a.close-popup {
    display: inline-block;
    padding: 8px 16px;
    background-color: #1d2c4f;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  .popup a.close-popup:hover {
    background-color: #162244;
  }
  
  .content-block {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
  }
  
  .image-container {
    margin-right: 20px;
  }
  
  .image-container img {
    max-width: 200px;
    max-height: 150px;
    object-fit: cover;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease;
  }
  
  .image-container img:hover {
    transform: scale(1.1);
  }
  
  .content {
    flex: 1;
  }
  
  .learn-more {
    background-color: #1d2c4f;
    color: #fff;
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  .learn-more:hover {
    background-color: #162244;
  }
  
  footer {
    background-color: #112d68;
    color: #fff;
    padding: 40px;
    text-align: center;
    font-size: 14px;
  }
  
  footer p {
    margin: 0;
  }
  
  @media screen and (max-width: 768px) {
    header h1 {
      font-size: 42px;
    }
    
    section h2 {
      font-size: 28px;
    }
  }
  
 </style>