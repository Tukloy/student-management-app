import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "@/views/DashboardView.vue";
import StudentsView from "@/views/StudentsView.vue";
import ProfileView from '@/views/ProfileView.vue';
import StudentCreate from '@/components/StudentCreate.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Dashboard",
      component: DashboardView,
    },
    {
      path: "/profile-view",
      name: "Profile View",
      component: ProfileView,
    },
    {
      path: "/students-view",
      name: "Students View",
      component: StudentsView,
    },
    {
      path: "/student-create",
      name: "Student Create",
      component: StudentCreate,
    },
    {
      path: '/:catchAll(.*)',
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

export default router;
