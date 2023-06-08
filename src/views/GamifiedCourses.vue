<template>
    <div>
        <main>
            <section id="Courses-list">
            <h2>introduction to Cybersecurity</h2>
            <ul>
                <li v-for="cours in GamifiedCourses" :key="cours.id">
                <img :src="cours.image" alt="Course Image">
                <div class="course-info">
                    <a href=".@/assets/llll/ll.html"><h3>{{cours.name}}</h3></a>
                    <p>{{ cours.descreption }}</p>
                </div>
                </li>
            </ul>
            </section>
        </main>

    </div>
    
</template>
<script>
export default {
    beforeCreate(){
      this.$store.dispatch('GetGamifiedCourses');
    },
    data(){
      return{

      }
    },
    computed: {
        GamifiedCourses() {
            return this.$store.state.GamifiedCourses.filter(element => element.learningpath ==this.$route.params.id);
        },
    },
    beforeMount(){
      this.$store.dispatch('GetGamifiedCourses');
      console.log(this.GamifiedCourses)
    }
}
</script>
<style scoped>
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f3f3f3;
  }
  
  header {
    background-color: #1d2c4f;
    color: #fff;
    padding: 20px;
    text-align: center;
  }
  
  main {
    padding: 20px;
  }
  
  h2 {
    font-size: 28px;
    margin-bottom: 20px;
    color: #1d2c4f;
    text-align: left;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s;
  }
  
  li:hover {
    transform: translateY(-5px);
  }
 .course-info a {
  cursor: pointer;
  text-decoration: none;
 }
  h3 {
    font-size: 22px;
    margin-bottom: 10px;
    color: #1d2c4f;
  }
  
  p {
    margin-bottom: 10px;
    line-height: 1.6;
  }
  li {
    display: flex;
  }
  
  img {
    width: 120px;
    height: auto;
    margin-right: 20px;
    border-radius: 5px;
  }
  
  .course-info {
    flex: 1;
  }
  
  footer {
    background-color: #1d2c4f;
    color: #fff;
    padding: 20px;
    text-align: center;
  }
  
</style>