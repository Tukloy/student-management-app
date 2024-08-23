<script setup>
import { ref, watch } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import Sidebar from '@/components/Sidebar.vue';
import Navbar from '@/components/Navbar.vue';

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
    // Add cases for other routes
    default:
      title.value = 'Error';
  }
};

// Set the title when the component is created
setTitle();

// Watch the route for changes and update the title
watch(route, setTitle);
</script>
<template>
  <Sidebar />
  <Navbar :showTitle="title" />
  <RouterView />
</template>
