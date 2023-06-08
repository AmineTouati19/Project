<template>
  <div class="form-container">
    <div class="video-wrapper">
      <video src="@/assets/ji.mp4" autoplay loop muted></video>
    </div>
    <form>
      <div v-for="(task, index) in tasks" :key="task.index" class="task">
        <label class="label">Task {{ index + 1 }}</label>
        <div class="input-container">
          <input type="text" v-model="task.name" class="input">
          <button type="button" @click="removeTask(task.index)" class="remove-btn">Remove</button>
          <button type="button" @click="saveTask(task)" class="next-btn">Next</button>
        </div>
      </div>
      <button type="button" @click="addTask" class="add-btn">Add</button>
      <button type="button" @click="submit" class="add-btn">Submit</button>
    </form>
  
  </div>
  
</template>

<script>
import axios from 'axios';

export default {
  
  data() {
    return {
      tasks: [
        {
          
        }
      ],
      id: 0,
      index: 0,
      challengeId: ""
    };
  },
  beforeCreate(){
    if(!this.$store.state.account.id){
        if(this.$store.state.account.role){
          this.$router.push('/'+this.$store.state.account.role+'/home');}
        else{
          this.$router.push('/login');}
    }
    this.$store.dispatch("GetNonPlanfiedchallenges")
    

  },
  computed:{
    Challenge(){
      const challengeId = this.$route.params.challengeId;
      return this.$store.state.NonPlanfiedchallenges.find(challenge => challenge.id == challengeId);
    }
  },
  beforeMount(){
    
    
    
    
    this.tasks = this.$store.state.CreateC.tasks.slice();
    const lastTask = this.$store.state.CreateC.tasks[this.$store.state.CreateC.tasks.length - 1];
    if (lastTask) {
      this.id =0;
    }
    
    //updatechallenge
    axios.get('http://127.0.0.1:8000/getNonPlanfiedchallenges/')
        .then((response) => {
          const chs=response.data
          
          const challengeId = this.$route.params.challengeId;
          this.Challenge=chs.find(challenge => challenge.id == challengeId);
          this.index=this.Challenge.task.length

    //updatetasks
        const tasksC=this.Challenge.task
        if (tasksC && tasksC.length > 0) {
              this.tasks=[]
              for (let i=0;i<tasksC.length;i++){
                const taskField = {
                  id: tasksC[i].id,
                  index: tasksC[i].tasknumber,
                  name: tasksC[i].name
                };
                this.tasks.push(taskField);
              }
          }
        })
        .catch((error) => {
          console.error("Failed to fetch data:", error);
        });
  },
  mounted() {
    
    
    this.challengeId = this.$route.params.challengeId; // Get the challengeId from the URL params
    //this.fetchChallengeData()

    axios.get('http://127.0.0.1:8000/getNonPlanfiedchallenges/')
        .then((response) => {
          const chs=response.data
          
          const challengeId = this.$route.params.challengeId;
          this.Challenge=chs.find(challenge => challenge.id == challengeId);

          if(this.Challenge){
            if(this.$store.state.account.id!=this.Challenge.created_by){
              if(this.$store.state.account.role){
                this.$router.push('/'+this.$store.state.account.role+'/home');
              }else
                this.$router.push('/')
            }
          }
        })
        .catch((error) => {
          console.error("Failed to fetch data:", error);
        });
    
    
  },
  updated() {
    this.tasks.sort((a, b) => a.index - b.index);
  },
  beforeRouteLeave(){
    this.fetchChallengeData();
  },
  methods: {
    fetchChallengeData() {
      axios.get('http://127.0.0.1:8000/getNonPlanfiedchallenges/')
        .then((response) => {
          const chs=response.data
          
          const challengeId = this.$route.params.challengeId;
          this.Challenge=chs.find(challenge => challenge.id == challengeId);
        })
        .catch((error) => {
          console.error("Failed to fetch data:", error);
        });
        this.fetchTasksList()

    },
    fetchTasksList(){
      this.tasks=[]
      const tasks=this.Challenge.task
      if (tasks && tasks.length > 0) {
              for (let i=0;i<tasks.length;i++){
                const taskField = {
                  id: tasks[i].id,
                  index: tasks[i].tasknumber,
                  name: tasks[i].name
                };
                this.tasks.push(taskField);
              }
            }
    },
    addTask() {
      this.index++
      const newTask = {
        id: 0,
        index: this.index,
        name: ""
      };
      this.tasks.push(newTask);
    },
    removeTask(index) {
        const ch1=this.tasks.find(
                  (task) => task.index ==index
                );
        const chId=ch1.id
        
      if(chId!==0){
        axios.delete('http://127.0.0.1:8000/updatetask/'+chId+'/').then(response => {
              console.log("deleted",response)
              
            }).catch(error => {
              console.log(error);
            }); 
      }
      
      this.tasks.splice(index-1, 1);
      
      for (let i=index-1; i<this.tasks.length; i++){
        this.tasks[i].index--
      } 
      this.index--
    },
    saveTask(task) {
      for (let ttsk of this.tasks){
        const isIt = this.Challenge.task.some(
                  (tsk) => tsk.id == ttsk.id
                );
        if(!isIt){
          this.$store.state.CreateC.tasks=this.tasks
          if (!ttsk.name) {
            alert("Please enter a task name."+ttsk);
            return;
          }

          const payload = {
            name: ttsk.name,
            tasknumber: ttsk.index,
            challenge: this.challengeId
          };

          axios.post('http://127.0.0.1:8000/creatTask/', payload).then(response => {
              ttsk.id = response.data.id
              if (ttsk==task){
                task.id = response.data.id
                this.$store.dispatch("GetNonPlanfiedchallenges")
                const a=response.data.id
                if (a!=0)
                  this.$router.push({ name: 'task-page', params: { taskId: a } });
              }
              
            })
            .catch(error => {
              console.log(error);
            });
            this.$store.dispatch("GetNonPlanfiedchallenges")
        }else{
          const ch = this.Challenge.task.find(
                  (tsk) => tsk.id == ttsk.id
                );
          if (!(ttsk.name==ch.name && ttsk.index==ch.tasknumber)){
            const payload = {
              id: ttsk.id,
              name: ttsk.name,
              tasknumber: ttsk.index,
            };
            axios.put('http://127.0.0.1:8000/updatetask/'+ttsk.id+'/', payload).then(response => {
              console.log("updated",response)
              if (task.id!=0)
                this.$router.push({ name: 'task-page', params: { taskId: task.id } });
            })
            .catch(error => {
              console.log(error);
            });
            this.$store.dispatch("GetNonPlanfiedchallenges")
          }
          else{
            if (ttsk.id==task.id){
              if(task.id!=0)
                this.$router.push({ name: 'task-page', params: { taskId: task.id } });
            }
          }  
        }

      }
    },
    submit(){
      for (let ttsk of this.tasks){
        const isIt = this.Challenge.task.some(
          (tsk) => tsk.id == ttsk.id
        );
        if(!isIt){
          this.$store.state.CreateC.tasks=this.tasks
          if (!ttsk.name) {
            alert("Please enter a task name."+ttsk);
            return;
          }

          const payload = {
            name: ttsk.name,
            tasknumber: ttsk.index,
            challenge: this.challengeId
          };

          axios.post('http://127.0.0.1:8000/creatTask/', payload).then(response => {
              
              console.log(response)
            })
            .catch(error => {
              console.log(error);
            });
            this.$store.dispatch("GetNonPlanfiedchallenges")
        }else{
          const ch = this.Challenge.task.find(
            (tsk) => tsk.id == ttsk.id
          );
          if (!(ttsk.name==ch.name && ttsk.index==ch.tasknumber)){
            const payload = {
              id: ttsk.id,
              name: ttsk.name,
              tasknumber: ttsk.index,
            };
            axios.put('http://127.0.0.1:8000/updatetask/'+ttsk.id+'/', payload).then(response => {
              console.log("updated",response)
            })
            .catch(error => {
              console.log(error);
            });
            this.$store.dispatch("GetNonPlanfiedchallenges")
          }
        }
      }
      this.$router.push('/instructorchallenges')
    }

  }
};
</script>


<style scoped>

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

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
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

.remove-btn:hover,
.add-btn:hover,
.next-btn:hover {
  background-color: #4da6ff;
}

.remove-btn,.next-btn 
{
  margin-left: 10px;
  margin-bottom: 10px;
}

.add-btn {
  margin-top: 10px;
  margin-left: 5px;
}



.task {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.task:hover {
  transform: translateY(-5px);
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
}

.label {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.input-container {
  display: flex;
  align-items: center;
}

.input {
  padding: 10px;
  border: none;
  border-bottom: 2px solid #ccc;
  margin-right: 10px;
  font-size: 16px;
  flex: 1;
  color: #333;
  transition: border-color 0.3s ease;
}

.input:focus {
  outline: none;
  border-color: #007bff;
}
</style>