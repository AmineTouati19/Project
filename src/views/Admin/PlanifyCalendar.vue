<template>
    
      
  <div id="calendar">
    <VCalendar   />
    <DatePicker v-model="date" :attributes="attributes" expanded />
      <!-- <template #day-popover>
        <div class="text-xs text-gray-700 dark:text-gray-300">
          <ul>
            <li v-for="i in Pchallenges()" :key="i.id">
              name: {{ i.name }} , 
              <span v-if="StartComp(i.start_date)"> start: 00:00:00  </span>
              <span v-else> start: {{ i.start_date.slice(11, 19) }} </span> ,
              <span v-if="EndComp(i.end_date)">end: 23:59:59</span>
              <span v-else>end: {{ i.end_date.slice(11, 19) }}</span>
            </li>
          </ul>
        </div>
      </template> 
    </DatePicker> -->
  </div>
  <div class="challenges-of-day">
    <div class="head">
      <span>{{ formatDate(date) }}</span>
    </div>
    <div class="content">
      <ul>
        <li v-if="Pchallenges().length != 0" style="text-align: center; color: blue;">
          <div class="column1">name</div>
          <div class="column2">
            <span>start</span>
          </div>
          <div class="column2">
            <span >end</span>
          </div>
        </li>
        <li v-for="i in Pchallenges()" :key="i.id">
          <div class="column1">{{ i.name }}</div>
          <div class="column2">
            <span v-if="StartComp(i.start_date)">00:00:00</span>
            <span v-else>{{ i.start_date.slice(11, 19) }}</span>
          </div>
          <div class="column2">
            <span v-if="EndComp(i.end_date)">23:59:59</span>
            <span v-else>{{ i.end_date.slice(11, 19) }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div>
    <router-link id="planify-new-challenge" class="btn btn-primary" to="/planify/challenges">planify new challenge</router-link> 
    <router-view/>
  </div>
  
  


</template>


<script>
import { DatePicker } from 'v-calendar';
import 'v-calendar/dist/style.css';
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';


export default {
name: 'AboutView',
components: {
  DatePicker,
},
methods: {
  formatDate(date) {
    if (!this.date) {
      return ; 
    }
    return date.toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  },
  StartComp(ChallengeStart) {
    const startDate = new Date(ChallengeStart);
    return this.date > startDate;
  },
  EndComp(ChallengeEnd) {
    const endDate = new Date(ChallengeEnd.split("T")[0]); // Extract only the date portion
    const selectedDate = new Date(this.date.toISOString().split("T")[0]); // Extract only the date portion of this.date
    return selectedDate.getTime() < endDate.getTime();
  },
  
  Pchallenges() {
    
    if (!this.date) {
      return []; 
    }
      const selectedChallenges = this.ch.filter(challenge => {
      const startDate = new Date(challenge.start_date.split("T")[0]);
      const endDate = new Date(challenge.end_date.split("T")[0]);
      
      const selectedDate = this.date;
      return (
        selectedDate >= startDate &&
        selectedDate <= endDate
      );
    });
    
    return selectedChallenges;
  }
},

setup() {
  const store = useStore();
  const ch = computed(() => store.state.Planfiedchallenges);

  const date = ref(new Date());

  const attributes = computed(() => [
    // Attributes for ch
    ...ch.value.map((challenge) => {
      const startDate = new Date(challenge.start_date);
      const endDate = new Date(challenge.end_date);
      const isSameDate = startDate.toDateString() === endDate.toDateString();

      return {
        dates: { start: startDate, end: endDate },
        ...(!isSameDate
          ? {} // If start and end dates are the same, do not include the highlight property
          : {
            dot: {
            color: challenge.color,
            class: '',
            }
          }),
        
        ...(isSameDate
          ? {} // If start and end dates are the same, do not include the highlight property
          : {
              highlight: {
                start: { fillMode: 'outline' },
                base: { fillMode: 'light' },
                end: { fillMode: 'outline' },
              },
            }),
        popover: true,
        customData: challenge,
      };
    }),
  ]);


  onMounted(() => {
    store.dispatch('GetPlanfiedchallenges');
  });
  

  return {
    ch,
    date,
    attributes,
  };
},
};
</script>
<style>
.challenges-of-day {
background-color: #f5f5f5;
border-radius: 5px;
padding: 10px;
margin-bottom: 20px;
}

.head {
background-color: #007bff;
color: #fff;
padding: 10px;
border-top-left-radius: 5px;
border-top-right-radius: 5px;
}

.head span {
font-size: 18px;
}

.content ul {
list-style-type: none;
padding: 0;
margin: 0;
}

.content ul li {
display: flex;
align-items: center;
justify-content: space-between;
padding: 10px;
border-bottom: 1px solid #ccc;
font-size: 14px;
transition: background-color 0.3s ease;
}

.content ul li:nth-child(even) {
background-color: #f9f9f9;
}

.column1 {
flex-basis: 40%;
}

.column2 {
flex-basis: 30%;
text-align: center;
}

#planify-new-challenge {
position: relative;
width: 20%;
top: 200px;
left: 1px ;
margin-top: 20px;
text-align: center;
text-decoration: none;
padding: 12px 24px;
background-color: #007bff;
color: #fff;
border: none;
border-radius: 4px;
font-weight: bold;
text-transform: uppercase;
transition: background-color 0.3s ease;
}

#planify-new-challenge:hover {
background-color: #0056b3;
}


</style>