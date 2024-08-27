<script setup>
import { ref, watch } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import Sidebar from '@/components/Sidebar.vue';
import Navbar from '@/components/Navbar.vue';
import Login from '@/views/LoginView.vue';

const route = useRoute();
const title = ref('');

const setTitle = () => {
  switch (route.name) {
    case 'Dashboard':
      title.value = 'Dashboard';
      break;
    case 'Profile View':
      title.value = 'Profile Management';
      break;
    case 'Students View':
      title.value = 'Student Management';
      break;
    case 'Student Create':
      title.value = 'Student Registration Form';
      break;
    case 'Instructors View':
      title.value = 'Instructor Management';
      break;
    case 'Instructors Create':
      title.value = 'Instructor Registration Form';
      break;
    case 'Courses View':
      title.value = 'Course Management'
      break;
    case 'Course View':
      title.value = 'Course Details'
      break;
    case 'Course Create':
      title.value = 'Course Create Form'
      break;
    case 'Course Edit':
      title.value = 'Course Edit Form'
      break;
    case 'Departments View':
      title.value = 'Department Road Map'
      break;
    case 'Department View':
      title.value = 'Department Management'
      break;
    case 'Events View':
      title.value = 'Event Management'
      break;
    case 'Analytics View':
      title.value = 'Analytic Management'
      break;
    case 'Help Center View':
      title.value = 'Help Center'
      break;
    // Add cases for other routes
    default:
      title.value = 'Error';
  }
};

// Set the title when the component is created
setTitle();

// Watch the route for changes and update the title
watch(route, setTitle);

const isLoggedIn = ref(false);

const handleLoginStatus = (status) => {
  isLoggedIn.value = status;
};
const logOutToggle = () => {
  isLoggedIn.value = false;
};
</script>
<template>
  <div>
    <div v-if="!isLoggedIn">
      <Login @login-status="handleLoginStatus" />
    </div>
    <div v-else>
      <Sidebar />
      <Navbar :showTitle="title" @login-status="logOutToggle" />
      <RouterView />
    </div>
  </div>
</template>
