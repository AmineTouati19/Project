<template>
  <div class="">
    
    
    
    <div id="calendar">
      <VCalendar   />
      <DatePicker v-model="date" :attributes="attributes" expanded />
        
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
    
    
    
  </div>
  
</template>


<script>
import { DatePicker } from 'v-calendar';
import 'v-calendar/dist/style.css';
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
//import { AOS } from 'aos';


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

    const date = ref(null);

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

  <style scoped>
  body{
    background-color: #fff;
  }
  .challenges-of-day {
  width: 500px;
  height: 300px;
  background-color: #fff;
  margin: auto;
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
}

.challenges-of-day .head {
  height: 40px;
  color: #fff;
  background-color: #333;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  font-weight: bold;
}

.challenges-of-day .content {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  text-align: start;
}

.challenges-of-day ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.challenges-of-day li {
  display: flex;
  justify-content: space-between;
  padding: 0,10px;
  margin-bottom: 5px;
}
.challenges-of-day .content .column1 {
  flex-basis: 60%;
  text-align: start;
}
.challenges-of-day .content .column2 {
  flex-basis: 20%;
  text-align: start;
}

.challenges-of-day li span {
  font-size: 14px;
}

.challenges-of-day li span.highlight {
  color: #ff0000;
  font-weight: bold;
}
#planify-new-challenge{
  margin: auto;
  margin-top: 10px
}


  .vc-light.vc-attr, .vc-light .vc-attr{
    --vc-highlight-solid-bg: ; 
    --vc-highlight-solid-content-color: ;
  }
  #calendar{
    width: 80%;
    margin: auto;
    /*zoom: 1.30;*/
  }
 .vc-popover-content{
    display: none;
    
  }
  
  </style>