import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    taskIdGlobal: 0,
    account: {
      id: null,
      email: null,
      username: null,
      role: null,
      is_verified: null,
      image: null,
      skills: null
    },
    Planfiedchallenges: [],
    NonPlanfiedchallenges: [],
    NonPlanfiedjobs:[],
    Paths:[],
    GamifiedCourses:[],

    CreateC: {
      challengeId: null,
      tasks: [],
      titles: [],
      texts: [],
      images: [],
      videos: [],
      files: [],
      tasksIds: {}
    }
  },
  getters: {
    getAccount: state => state.account
  },
  mutations: {
    settaskIdGlobal: (state, value) => {
      state.taskIdGlobal = value;
    },
    setAccount: (state, data) => {
      state.account = data;
    },
    GetPlanfiedchallenges_M(state) {
      axios.get('http://127.0.0.1:8000/getPlanfiedchallenges/').then(resp => {
        state.Planfiedchallenges = resp.data;
      });
    },
    GetNonPlanfiedchallenges_M(state) {
      axios.get('http://127.0.0.1:8000/getNonPlanfiedchallenges/').then(resp => {
        state.NonPlanfiedchallenges = resp.data;
      });
      
    },
    GetNonPlanfiedjobs_M(state) {
      axios.get('http://127.0.0.1:8000/getnonplanifiedJob/').then(resp => {
        state.NonPlanfiedjobs = resp.data;
      });
    },
    GetPaths_M(state) {
      axios.get('http://127.0.0.1:8000/createlearningpath/').then(resp => {
        state.Paths = resp.data;
      });
    },
    GetGamifiedCourses_M(state) {
      axios.get('http://127.0.0.1:8000/creategamifiedcours/').then(resp => {
        state.GamifiedCourses = resp.data;
      });
    },
    async CreateTasks_M(state) {
      for (let i = 0; i < state.CreateC.tasks.length; i++) {
        const payload = {
          name: state.CreateC.tasks[i].name,
          tasknumber: i + 1,
          challenge: state.CreateC.tasks[i].challenge
        };
    
        try {
          const response = await axios.post('http://127.0.0.1:8000/creatTask/', payload);
          console.log(response);
          const taskId = response.data.id;
          state.taskIdGlobal = taskId;
          console.log(taskId);
          console.log(i);
    
          // Call the next mutation to create task images
          await this.commit('CreateTaskImages_M', { taskId: taskId, old: i+1 });
        } catch (error) {
          console.log(error);
        }
      }
    },
    async CreateTaskImages_M(state, payload) {
      const { taskId, old } = payload;
      console.log(taskId);
      console.log(old);
      
      console.log(old);
      
      for (let i = 0; i < state.CreateC.images.length; i++) {
        console.log(state.CreateC.images[i].taskId);
        if (state.CreateC.images[i].taskId == old) {
          const task = state.CreateC;
          const payload = {
            image: task.images[i].value,
            imagenumber: task.images[i].num,
            task: taskId
          };
          console.log(payload);
          
          try {
            const response = await axios.post('http://127.0.0.1:8000/creatTaskImages/', payload);
            console.log(response);
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
    
  },
  actions: {
    login: ({ commit }, data) => {
      commit('setAccount', data);
    },
    GetPlanfiedchallenges({ commit }) {
      commit('GetPlanfiedchallenges_M');
    },
    GetNonPlanfiedchallenges({ commit }) {
      commit('GetNonPlanfiedchallenges_M');
    },
    GetNonPlanfiedjobs({ commit }) {
      commit('GetNonPlanfiedjobs_M');
    },
    GetPaths({ commit }) {
      commit('GetPaths_M');
    },
    GetGamifiedCourses({ commit }) {
      commit('GetGamifiedCourses_M');
    },
   
    CreateChallenge({ commit }) {
      commit('CreateTasks_M');
    }
  },
  modules: {}
});
