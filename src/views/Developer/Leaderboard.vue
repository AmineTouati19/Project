<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="leaderboard">
        <div class="video-wrapper">
      <video src="../../assets/hi2.mp4" autoplay loop muted></video>
    </div>
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(participant, index) in participants" :key="participant.id">
            <td>
              <span :class="getRankClass(index)">
                {{ index + 1 }}
                <i v-if="index < 3" class="trophy-icon fas fa-trophy"></i>
              
              </span>
            </td>
            <td>
              <div class="avatar">
                <img src="../../assets/avatar.png" alt="Avatar" />
                <span>{{ participant.username }}</span>
              </div>
            </td>
            <td>{{ participant.point }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        participants: [],
      };
    },
    mounted() {
      this.fetchLeaderboardData();
    },
    methods: {
      fetchLeaderboardData() {
        axios
          .get('http://127.0.0.1:8000/leadrboard/')
          .then(response => {
            this.participants = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      },
      getRankClass(index) {
        if (index === 0) {
          return 'gold-rank';
        } else if (index === 1) {
          return 'silver-rank';
        } else if (index === 2) {
          return 'bronze-rank';
        } else {
          return '';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .leaderboard {
    margin-top: 25px;
    background-color: #f7f7f7b1;
    padding: 20px;
    border-radius: 4px;
  }
  .leaderboard h1 {
    text-align: center;
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
  
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th {
    text-align: left;
    background-color: #212121;
    color: #fff;
    padding: 12px;
  }
  
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  td {
    padding: 12px;
  }
  
  .gold-rank {
    display: flex;
    align-items: center;
    gap: 10px;
    color: gold;
    font-weight: bold;
  }
  
  .silver-rank {
    display: flex;
    align-items: center;
    gap: 10px;
    color: silver;
    font-weight: bold;
  }
  
  .bronze-rank {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #cd7f32;
    font-weight: bold;
  }
  .badge {
    display: inline-block;
    padding: 2px 6px;
    background-color: red; /* Customize the background color of the badge */
    color: white; /* Customize the text color of the badge */
    font-size: 12px; /* Customize the font size of the badge */
    border-radius: 4px; /* Customize the border radius of the badge */
    margin-left: 5px; /* Adjust the spacing between the badge and the trophy icon */
  }
  
  .avatar {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .avatar img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
  
  .avatar span {
    font-weight: bold;
  }
  
  .trophy-icon {
    font-size: 20px;
    margin-left: 5px;
  }
  </style>
  