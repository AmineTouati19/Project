<template>
  <div class="home">
    <AdminNavBar style="margin-bottom: 10px;" />
    <div class="challenges row">
      <div class="col-md-4" v-for="challenge in challenges" :key="challenge.id">
        <div class="challenge card mb-3">
          <div class="card-body">
            <h4 class="card-title">{{ challenge.name }}</h4>
            <p class="card-text">{{ challenge.descreption }}</p>
            <button class="btn btn-primary" @click="openModal(challenge.id)">Planify</button>
          </div>
        </div>
      </div>
    </div>


    <!-- Modal -->
    <div id="md1" class="mymodal" tabindex="-1" role="dialog" v-if="selectedChallenge">
      <div class="modal-content pop-up">
        <div class="modal-header">
          <h5 class="modal-title">Planify Challenge</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <label for="start-date">Start Date:</label>
          <input type="date" id="start-date" v-model="selectedStartDate">

          <label for="start-time">Start Time:</label>
          <input type="time" id="start-time" v-model="selectedStartTime">

          <label for="end-date">End Date:</label>
          <input type="date" id="end-date" v-model="selectedEndDate">

          <label for="end-time">End Time:</label>
          <input type="time" id="end-time" v-model="selectedEndTime">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="planifyChallenge">Planify</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="closeModal">Cancel</button>
        </div>
      </div>
    </div>
    <div style="text-align: center;">
      <router-link id="planify-new-challenge" class="btn btn-primary" to="/admin/schedule">schedule</router-link> 
      <router-view/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AdminNavBar from '@/components/AdminNavBar.vue';
//import { AOS } from 'aos';

export default {
  name: 'PlanifyChallenge',
  beforeCreate() {
    this.$store.dispatch('GetNonPlanfiedchallenges');
    if(this.$store.state.account.role!='admin'){
    if(this.$store.state.account.role){
      this.$router.push('/'+this.$store.state.account.role+'/home');}
    else{
      this.$router.push('/login');}
    }
    
        
  },
  components:{
    AdminNavBar,
  },
  computed: {
    challenges() {
      return this.$store.state.NonPlanfiedchallenges;
    },
  },
  beforeMount() {
    this.$store.dispatch('GetNonPlanfiedchallenges');
  },
  data() {
    return {
      //challenges: this.$store.state.NonPlanfiedchallenges,
      selectedChallenge: null,
      selectedStartDate: '',
      selectedEndDate: '',
      selectedStartTime: '',
      selectedEndTime: '',
    };
  },
  methods: {
    openModal(id) {
      this.selectedChallenge = id;
      this.selectedStartDate = '';
      this.selectedEndDate = '';
      this.selectedStartTime = '';
      this.selectedEndTime = '';
    },
    closeModal() {
      this.selectedChallenge = null;
    },
    planifyChallenge() {
  const dataToUpdate = {
    start_date: this.selectedStartDate + "T" + this.selectedStartTime + ":00Z",
    end_date: this.selectedEndDate + "T" + this.selectedEndTime + ":00Z",
  };

  axios
    .put('http://127.0.0.1:8000/planifychallenge/' + this.selectedChallenge + '/', dataToUpdate)
    .then(response => {
      console.log('Data updated successfully:', response.data);
      // Handle the response or perform any other actions
      window.alert('Challenge planified successfully!');
      // Remove the planified challenge from the challenges array
      this.challenges = this.challenges.filter(challenge => challenge.id !== this.selectedChallenge);
      this.selectedChallenge = null; // Reset the selected challenge after planification

      // Manually refresh the page
      location.reload();
    })
    .catch(error => {
      console.error('Error updating data:', error);
      // Handle the error or show an error message
    });

  this.closeModal();
},




  },
};
</script>


<style scoped>

.mymodal {
  width: 500px;
  height: 500px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.modal-content {
  padding: 20px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}

.modal-title {
  font-size: 18px;
}

.close {
  background: none;
  border: none;
  font-size: 24px;
  color: #999;
  cursor: pointer;
}

.modal-body {
  padding: 20px 0;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
  border-top: 1px solid #ccc;
}

.btn {
  margin-top: 15px;
  margin-left: 5px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
}

.btn-secondary {
  background-color: #ccc;
  color: #fff;
  margin-right: 10px;
}
</style>
