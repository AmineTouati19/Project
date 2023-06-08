import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    redirect: '/landing'
  },{
    path: '/landing',
    name: 'Landing',
    component: () => import('../views/login/LandingPage.vue')
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/LoginPage.vue')
  },
  {
    path: '/forget',
    name: 'Forget',
    component: () => import('../views/login/ForgetView.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/login/SignUp.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/login/ContactUs.vue')
  },
  {
    path: '/verification/:email', // Add the parameter ":email"
    name: 'verification',
    props: true,
    component: () => import('../views/login/VerificationOtp.vue'),
  }, 



  {
    path: '/schedule',
    name: 'Schedule',
    component: () => import('../views/ScheduleCalendar.vue')
  },
  {
    path: '/paths',
    name: 'Paths',
    component: () => import('../views/PathsPage.vue')
  },
  {
    path: '/paths/:id',
    name: 'GamifiedCourses',
    component: () => import('../views/GamifiedCourses.vue')
  },
  // admin
  {
    path: '/adminhome',
    name: 'AdminHome',
    component: () => import('../views/Admin/AdminHome.vue')
  },
  {
    path: '/admin/createpath',
    name: 'CreatePath',
    component: () => import('../views/Admin/CreatePath.vue')
  },
  {
    path: '/admin/schedule',
    name: 'AdminSchedule',
    component: () => import('../views/Admin/PlanifyCalendar.vue')
  },
  {
    path: '/admin/schedule/challenges',
    name: 'PlanifyChallenge',
    component: () => import('../views/Admin/PlanifyChallenge.vue')
  },

  // developer
  {
    path: '/developerhome',
    name: 'DeveloperHome',
    component: () => import('../views/Developer/DeveloperHome.vue')
  },
  {
    path: '/developer/challenge/:challengeId',
    name: 'ParticipateChallenge',
    component: () => import('../views/Developer/ParticipateChallenge.vue'),
    params: true
  },
  {
    path: '/challenges',
    name: 'ChallengesPage',
    component: () => import('../views/Developer/ChallengesPage.vue'),
    params: true
  },
  
  {
    path: '/developer/schedule',
    redirect: '/schedule'
  },
  {
    path: '/leaderboard',
    name: 'Leaderboard',
    component: () => import('../views/Developer/Leaderboard.vue'),
  },
  // company
  {
    path: '/company/home',
    name: 'CompanyHome',
    component: () => import('../views/Company/CompanyHome.vue')
  },

  /* {
    path: '/company/Joboffers',
    name: 'CompanyChallenges',
    component: () => import('../views/Instructor/ChallengesPage.vue')
  }, */
  {
    path: '/company/form',
    name: 'CompanyForm',
    component: () => import('../views/Company/FormPage.vue')
  },
  {
    path: '/company/tasks/:challengeId',
    name: 'Companytasks',
    component: () => import('../views/Company/TaskForm.vue')
  },
  {
    path: '/company/task-page/:challengeId/:taskId',
    name: 'Companytask-page',
    component: () => import('../views/Company/TaskPage.vue'),
    props: true
  },
  
  
  {
    path: '/company/schedule',
    redirect: '/schedule'
  },
  //instructor
  {
    path: '/instructorhome',
    name: 'InstructorHome',
    component: () => import('../views/Instructor/InstructorHome.vue')
  },
  {
    path: '/instructorchallenges',
    name: 'InstructorChallenges',
    component: () => import('../views/Instructor/ChallengesPage.vue')
  },
  {
    path: '/instructor/form',
    name: 'Form',
    component: () => import('../views/Instructor/Challenge/FormPage.vue')
  },
  {
    path: '/instructor/tasks/:challengeId',
    name: 'tasks',
    component: () => import('../views/Instructor/Challenge/TaskForm.vue')
  },
  {
    path: '/instructor/task-page/:challengeId/:taskId',
    name: 'task-page',
    component: () => import('../views/Instructor/Challenge/TaskPage.vue'),
    props: true
  },


  {
    path: '/instructor/paths/:id',
    name: 'InstructorCourses',
    component: () => import('../views/Instructor/InstructorCourses.vue')
  },
  {
    path: '/instructor/paths/:id/create',
    name: 'CreateCours',
    component: () => import('../views/Instructor/Cours/CourseDetails.vue'),

  },
  {
    path: '/instructor/courstasks/:coursId',
    name: 'CoursTasks',
    component: () => import('../views/Instructor/Cours/TaskForm.vue')
  },
  {
    path: '/instructor/courstask-page/:coursId/:taskId',
    name: 'Courstask-page',
    component: () => import('../views/Instructor/Cours/TaskPage.vue'),
    props: true
  },



  {
    path: '/instructor/schedule',
    redirect: '/schedule'
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
/* const role=store.getters.getAccount.role
if (role=='admin'){
  routes.push({
    path: '/',
    redirect: '/adminlanding'
  },);
}else{
  routes.push({
    path: '/',
    redirect: '/landing'
  },);
} */

export default router
