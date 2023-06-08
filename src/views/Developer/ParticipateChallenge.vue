<template>
  <div v-if="challengeLoaded">
    <div v-if="Challenge" class="challenge">
      <div class="task" v-for="i in Challenge.task" :key="i.tasknumber">
        <div class="task-head">
          <span class="task-num">Task {{ i.tasknumber }}</span>
          <span class="task-name">{{ i.name }}</span>
          <i class="fas fa-angle-down" @click="toggleTask(i.tasknumber)"></i>
        </div>
        <div class="task-body" v-show="isTaskOpen(i.tasknumber)">
          <div v-for="j in 50" :key="j">
            <div v-for="k in i.titel" :key="k.titelnumber">
              <div v-if="k.titelnumber == j" class="title">{{ k.titel }}</div>
            </div>
            <div v-for="k in i.images" :key="k.imagenumber">
              <div v-if="k.imagenumber == j" class="image">
                <img :src="k.image_url">
              </div>
            </div>
            <div v-for="k in i.paragraph" :key="k.paragraphnumber">
              <div v-if="k.paragraphnumber == j" class="paragraph">{{ k.paragraph }}</div>
            </div>
            <div v-for="k in i.taskfile" :key="k.filenumber">
              <div v-if="k.filenumber == j" class="file">
                <a :href="'http://127.0.0.1:8000' + k.task_file" download>Download</a>
              </div>
            </div>
            <div v-for="k in i.video" :key="k.video_number">
              <div v-if="k.video_number == j" class="video">
                <video class="video-player" controls>
                  <source :src="'http://127.0.0.1:8000' + k.task_vedio" type="video/mp4">
                </video>
              </div>
            </div>
            <div v-for="k in i.question" :key="k.question_number">
              <div v-if="k.question_number === j && !isAnswered(k.id)" class="question">
      <form @submit.prevent="submitAnswer(k.id)">
        <div class="question-text">{{ k.question }}</div>
        <input :id="k.id" v-model="answerData[k.id]" type="text" placeholder="Your answer">
        <button type="button" @click="showHint(k.question_hint)" class="hint-button">Hint</button>
        <input type="submit" value="Submit">
        <div v-if="showingHint" class="hint-popup">
          {{ hintText }}
        </div>
      </form>
    </div>
              <div v-else-if="k.question_number == j" class="question-answered">
                <input type="text" :value="k.question_solution" disabled>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import router from '@/router';
import axios from 'axios';

export default {
  data() {
    return {
      challengeLoaded: false,
      openTasks: [],
      participateId: "",
      UserId: this.$store.state.account.id,
      answerData: {},
      showingHint: false,
      hintText: '',
    };
  
    
  },

  computed: {
    Challenge() {
      const challengeId = this.$route.params.challengeId;
      return this.$store.state.Planfiedchallenges.find(challenge => challenge.id == challengeId);
    },
    participate(){
      if (this.Challenge)
        return this.Challenge.participate.find((part) => part.user_detail.id == this.UserId);
      else
        return false
    }
  },
  beforeCreate(){
    
    if(this.$store.state.account.role!='developer'){
      if(this.$store.state.account.role){
        this.$router.push('/'+this.$store.state.account.role+'/home');}
      else{
        this.$router.push('/login');}
    }else{
      this.$store.dispatch("GetPlanfiedchallenges")
      .then(() => {
        this.challengeLoaded = true;
      })
      .catch((error) => {
        console.error("Failed to fetch Planfiedchallenges:", error);
      });
      
      
      axios
        .get('http://127.0.0.1:8000/getPlanfiedchallenges/')
        .then((response) => {
          const chs = response.data;
          const chId = this.$route.params.challengeId;
          const ch =chs.find(challenge => challenge.id == chId);
          
          if(ch){
            const UserId = this.$store.state.account.id;
            const isUserRegistered = ch.registre.some(
              (registration) => registration.user_detail.id == UserId
            );
            if (!isUserRegistered)
              router.push({path:'/developer/challenges'})
            const isUserPartcipated = ch.participate.some(
              (participate) => participate.user_detail.id == UserId
            );
            if(!isUserPartcipated){
              const participateData={
                  "participate_by": UserId,
                  "challenge": chId
              }
              axios.post("http://127.0.0.1:8000/participate/",participateData)
                
            }
          }else
            router.push({path:'/developer/challenges'})
        })
    }
        
  },
  updated() {
    
    
    this.fetchChallengeData();
    this.fetchParticipationData();
    
  },
  methods: {
    showHint(hint) {
      this.hintText = hint;
      this.showingHint = true;
    },
    fetchChallengeData() {
      this.$store.dispatch("GetPlanfiedchallenges")
      const challengeId = this.$route.params.challengeId;
      this.Challenge= this.$store.state.Planfiedchallenges.find(challenge => challenge.id == challengeId);
    },

    fetchParticipationData() {
      if (this.Challenge)
        this.participate= this.Challenge.participate.find((part) => part.user_detail.id == this.UserId);
      else
        this.participate= false
    },
    //design
      toggleTask(taskNumber) {
          if (this.isTaskOpen(taskNumber)) {
              this.closeTask(taskNumber);
          } else {
              this.openTask(taskNumber);
          }
      },
      openTask(taskNumber) {
          if (!this.isTaskOpen(taskNumber)) {
              this.openTasks.push(taskNumber);
          }
      },
      closeTask(taskNumber) {
          this.openTasks = this.openTasks.filter((task) => task !== taskNumber);
      },
      isTaskOpen(taskNumber) {
          return this.openTasks.includes(taskNumber);
      },
     

      //answer
      submitAnswer(questionId) {
        const answer = this.answerData[questionId];

        // Create the answer object
        const answerObject = {
          answer: answer,
          question: questionId,
          user: this.UserId,
          challenge: this.$route.params.challengeId,
          participate: this.participate.id,
        };
        console.log(answerObject)

        // Send the answer to the API using axios
        axios.post("http://127.0.0.1:8000/answer/", answerObject)
          .then(() => {
            // Handle the response if needed
            console.log("correct answer")
          })
          .catch((error) => {
            alert(error.response.data.message);
          });

        // Reset the input field value
        this.answerData[questionId] = "";
        this.fetchChallengeData();
        this.fetchParticipationData();
      },
      isAnswered(questionId){
        if (this.participate){
          const isIt = this.participate.answers.some(
                (answer) => answer.question == questionId
              );
          return isIt
        }else
          return false
        

      }
       
  },
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');


.challenge {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.task {
  background-color: #f2f2f2;
  border-radius: 5px;
  margin: 20px auto;
  width: 90%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.task-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #212c42;
  color: #fff;
  padding: 10px;
  border-radius: 5px 5px 0 0;
}

.task-num {
  font-weight: 500;
  color: red;
}

.task-name {
  font-weight: 500;
  margin-left: 10px;
}

.fas.fa-angle-down {
  cursor: pointer;
  color: #fff;
}

.task-body {
  padding: 20px;
}

.title {
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  font-weight: 600;
  margin-top: 15px;
}

.image img {
  max-width: 100%;
  height: auto;
  margin-top: 15px;
  border-radius: 5px;
}

.paragraph {
  margin-top: 15px;
  font-family: 'Poppins', sans-serif;
  line-height: 1.5;
}

.file a {
  display: inline-block;
  padding: 8px 15px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 15px;
  font-weight: 500;
}

.video-player {
  width: 100%;
  height: auto;
  margin-top: 15px;
  border-radius: 5px;
}

.question {
  margin-top: 20px;
}

.question-text {
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  margin-bottom: 10px;
}

.question input[type="text"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 10px;
}

.question-answered input[type="text"] {
  width: 100%;
  padding: 10px;
  color: green;
  border: 1px solid green;
  border-radius: 4px;
  margin-top: 10px;
}

.question input[type="submit"] {
  padding: 8px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  font-weight: 500;
}

/* Additional TryHackMe style */
html, body {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Poppins', sans-serif;
  margin: 0;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
.hint-button {
  position: relative;
  padding: 8px 15px;
  background-color: #ffc400;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  margin-right: 10px;
  font-weight: 500;
}

.hint-popup {
  position: absolute;
  top: 204px;
  left: 300px;
  transform: translateX(-50%);
  background-color: #ce2727;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 999;
  font-size: 14px;
  line-height: 1.4;
  max-width: 200px;
  white-space: normal;
  word-wrap: break-word;
}
</style>