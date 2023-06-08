<template>
  <div class="">
    <div class="video-wrapper">
      <video src="../../assets/hi2.mp4" autoplay loop muted style="position: fixed; z-index: -1;"></video>
    </div>
    <AdminNavBar style="margin-bottom: 10px;"/>
    <CalendarComp />
    <div style="text-align: center;">
      <router-link id="planify-new-challenge" class="btn btn-primary" to="/admin/schedule/challenges">planify new challenge</router-link> 
      <router-view/>
    </div>
    
    
  </div>
  
</template>


<script>
import CalendarComp from '@/components/CalendarComp.vue';
import AdminNavBar from '@/components/AdminNavBar.vue';

//import { AOS } from 'aos';


export default {
  name: 'AboutView',
  components: {
    CalendarComp,
    AdminNavBar
  },
  beforeCreate() {
            if(this.$store.state.account.role!='admin'){
                if(this.$store.state.account.role){
                    this.$router.push('/'+this.$store.state.account.role+'/home');}
                else{
                    this.$router.push('/login');}
            }
  },
}
  
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