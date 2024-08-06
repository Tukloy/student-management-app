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
      title.value = 'Students Management';
      break;
    case 'Student Create':
      title.value = 'Student Registration Form';
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
