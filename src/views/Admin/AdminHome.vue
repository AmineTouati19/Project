<template>
  <div class="dashboard">
    <div class="sidebar">
      <div class="logo">
        <!-- Place your logo here -->
        <img src="../../assets/a.png" alt="Logo">
      </div>
      <ul>
        <li @click="navigate('users')" :class="{ active: activePage === 'users' }">
          <i class="fas fa-users"></i>
          <span>Users</span>
        </li>
        <li @click="navigate('planify')" :class="{ active: activePage === 'planify' }">
          <i class="fas fa-calendar-alt"></i>
          <span>Planify</span>
        </li>
        <li @click="navigate('settings')" :class="{ active: activePage === 'settings' }">
          <i class="fas fa-book"></i>
          <span>Path</span>
        </li>
      </ul>
      <div class="sidebar-footer">
        <div class="theme-option">
          <i class="fas fa-paint-brush"></i>
          <span>Theme</span>
        </div>
        <li class="logout" href="Login" @click="logout()">
          <i class="fas fa-sign-out-alt"></i>
          <router-link :to="{ name: 'Login' }">
            <span>LOGOUT</span>
          </router-link>
        </li>
      </div>
    </div>
    <div class="main-content">
      <header>
        <div class="search-bar">
          <input type="text" placeholder="Search">
          <i class="fas fa-search"></i>
        </div>
        <div class="profile">
          <i class="fas fa-user-circle"></i>
        </div>
      </header>

      <div v-if="activePage === 'planify'" class="calendar">
        <!-- Your calendar component goes here -->
        <Calendar />
      </div>
      <div v-if="activePage === 'settings'" class="settings">
        <!-- Your settings component goes here -->
        <Settings />
      </div>
      <div v-if="activePage === 'users'" class="users">
        <!-- Your settings component goes here -->
        <Users />
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from './PlanifyCalendar copy.vue';
import Settings from './CreatePath.vue'; // Import your Settings component
import Users from './Users.vue';
export default {
  data() {
    return {
      activePage: '' // Keeps track of the active page
    };
  },
  components: {
    Calendar,
    Settings,
    Users // Register the Settings component
  },
  methods: {
    logout() {
      sessionStorage.removeItem('account');
      this.$store.state.account = {
        "id": null,
        "email": null,
        "username": null,
        "role": null,
        "is_verified": null,
        "image": null,
        "skills": null
      };
      this.$router.push('/login');
    },
    navigate(page) {
      this.activePage = page; // Update the active page
      // Handle navigation logic here
      console.log(`Navigating to ${page}`);
      if (page === 'settings') {
         // Replace '/create' with your desired route path for the Settings page
      }
    }
  }
};
</script>

<style>
.dashboard {
  display: flex;
  height: 155vh;
}

.sidebar {
  flex: 0 0 250px;
  background-color: #343a40;
  /* Add your sidebar styles here */
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  background-color: #212529;
}

.logo img {
  max-height: 60px;
  max-width: 80%;
  height: auto;
  /* Add your logo styles here */
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 5px; /* Added spacing between the sidebar items */
}

.sidebar li:hover {
  background-color: #495057;
}

.sidebar li.active {
  background-color: #212529;
}

.sidebar i {
  margin-right: 10px;
  color: #fff; /* Change the icon color */
}

.sidebar span {
  color: #fff; /* Change the text color */
}

.sidebar-footer {
  margin-left: -10px;
  margin-top: 400px; /* Pushes the footer to the bottom */
  padding: 10px;
}

.theme-option,
.logout {
  position: fixed;
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.logout {
  margin-top: 50px;
}

.theme-option:hover,
.logout:hover {
  background-color: #495057;
}

.theme-option i,
.logout i {
  margin-right: 10px;
  color: #fff; /* Change the icon color */
}

.theme-option span,
.logout span {
  color: #fff; /* Change the text color */
}

.main-content {
  flex: 1;
  /* Add your main content styles here */
}

header {
  display: flex;
  height: 80px;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: #3c4146;
  border-bottom: 1px solid #dee2e6;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 4px;
  padding: 6px;
  margin-right: 10px; /* Added margin to create space between search bar and profile icon */
}

.search-bar input {
  border: none;
  outline: none;
  padding: 6px;
}

.search-bar i {
  color: #495057;
  font-size: 18px;
  margin-right: 6px;
}

.profile i {
  font-size: 24px;
  color: #a0aab3;
}
</style>