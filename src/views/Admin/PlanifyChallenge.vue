<template>
  <div class="home">
    
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
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'PlanifyChallenge',
  beforeCreate() {
    this.$store.dispatch('GetNonPlanfiedchallenges');
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


<style>
.challenges.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.col-md-4 {
  flex: 0 0 calc(33.33% - 20px);
  margin-bottom: 20px;
}

.challenge.card {
  position: relative;
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  overflow: hidden;
}

.challenge.card:hover {
  transform: translateY(-5px);
}

.card-body {
  padding: 20px;
}

.card-title {
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
}

.card-text {
  color: #666;
}

.btn-primary {
  display: inline-block;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.challenge-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.challenge-image img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
}

.challenge.card:hover .challenge-image img {
  transform: scale(1.1);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.challenge.card:hover .overlay {
  opacity: 1;
}

.overlay-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fff;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.challenge.card:hover .overlay-content {
  opacity: 1;
}

.overlay-content h4 {
  font-size: 20px;
  margin-bottom: 10px;
}

.overlay-content p {
  font-size: 14px;
}


.mymodal {
  width: 500px;
  max-width: 90%;
  height: auto;
  max-height: calc(100vh - 40px);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
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
  font-size: 24px;
  color: #333;
  margin: 0;
}

.close {
  background: none;
  border: none;
  font-size: 24px;
  color: #999;
  cursor: pointer;
  transition: color 0.3s ease;
}

.close:hover {
  color: #555;
}

.modal-body {
  padding: 20px 0;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #007bff;
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
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #ccc;
  color: #fff;
  margin-right: 10px;
}

.btn-secondary:hover {
  background-color: #999;
}


</style>
