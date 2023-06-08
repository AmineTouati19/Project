<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="form-container">
    <div class="video-wrapper">
      <video src="@/assets/ji.mp4" autoplay loop muted></video>
    </div>
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

      <div class="form-group">
        <label for="skillsrequirment">Skills requirment:</label>
        <textarea id="skillsrequirment" v-model="skillsrequirment"></textarea>
      </div>
      <div class="form-group">
        <label for="jobbenifits">Job benifits:</label>
        <textarea id="jobbenifits" v-model="jobbenifits"></textarea>
      </div>
      <div class="form-group">
        <label for="employment_nedded">Employment nedded:</label>
        <input type="number" id="employment_nedded" v-model="employment_nedded" />
      </div>
      
      <div class="form-group">
        <label for="max_teamsize">Max participants:</label>
        <input type="number" id="max_teamsize" v-model="max_teamsize" />
      </div>
      <div  class="form-group">
        <label class="label">Rules: </label>
        <div v-for="(rule, id) in rules" :key="rule.id" class="task">
          <div class="input-container">
            <input type="text" v-model="rule.rule" class="input">
            <button type="button" @click="removeRule(id)" class="remove-btn">Remove</button>
          </div>
        </div>
        <button type="button" @click="addRule" class="add-btn">Add rule</button>
      </div>
      <button class="next-btn" @click="saveForm">Next</button> 
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  beforeCreate(){
    if(this.$store.state.account.role!='instructor' || !this.$store.state.account.id){
        if(this.$store.state.account.role){
          this.$router.push('/'+this.$store.state.account.role+'/home');}
        else{
          this.$router.push('/login');}
    }
  },
  data() {
    return {
      name: '',
      image: '',
      descreption: '',
      created_by:this.$store.state.account.id,
      points: 0,
      max_teamsize: '',
      challenge_type: "job",
      job: null,

      skillsrequirment: '',
      jobbenifits:'',
      employment_nedded:'',

      rules:[{id:0,rule:''}],
      idrule:0,

      previewUrl: null,
    }
  },
  methods: {
    addRule() {
      this.idrule++
      const newRule = {
        id: this.idrule,
        rule: ""
      };
      this.rules.push(newRule);
    },
    removeRule(index) {
      this.rules.splice(index, 1);
      for (let i=index; i<this.rules.length; i++){
        this.rules[i].id--
      } 
      this.idrule--
    },

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
      const formData0 = new FormData();
      formData0.append('name', this.name);
      formData0.append('descreption', this.descreption);
      formData0.append('skillsrequirment', this.skillsrequirment);
      formData0.append('jobbenifits', this.jobbenifits);
      formData0.append('employment_nedded', this.employment_nedded);
      formData0.append('image', this.image);
      axios.post('http://127.0.0.1:8000/createjoboffer/', formData0)
        .then(response => {
          this.job=response.data.id

          
          const formData = new FormData();
          formData.append('image', this.image);
          formData.append('name', this.name);
          formData.append('descreption', this.descreption);
          formData.append('points', this.points);
          formData.append('max_teamsize', this.max_teamsize);
          formData.append('challenge_type', this.challenge_type);
          formData.append('created_by', this.created_by);
          
          formData.append('job', this.job);
          
          
          
          
          axios.post('http://127.0.0.1:8000/createchalenges/', formData)
          .then(response => {
            const challengeId = response.data.id;
            console.log(challengeId)
        // Pass the challengeId to the tasks page
            for (let rule of this.rules){
                const payload = {
                  rule: rule.rule,
                  challenges: challengeId
                };
                console.log(rule,payload)
                axios.post('http://127.0.0.1:8000/creatrules/', payload)
            } 
              this.$router.push({ name: 'Companytasks', params: { challengeId: challengeId } });
          })
          .catch(error => {
            console.log(error);
          })

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
.add-btn{
  width: fit-content;
  margin-left: 50%;
  transform: translate(-50%, 0);
}
.remove-btn,
.add-btn,
.next-btn {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}
</style>
