import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "@/views/DashboardView.vue";
import StudentsView from "@/views/StudentsView.vue";
import ProfileView from '@/views/ProfileView.vue';
import StudentCreate from '@/components/StudentCreate.vue';
import InstructorsView from '@/views/InstructorsView.vue';
import InstructorCreate from "@/components/InstructorCreate.vue";
import CoursesView from "@/views/CoursesView.vue";
import CourseView from "@/components/CourseView.vue";
import CourseCreate from '@/components/CourseCreate.vue';
import CourseEdit from '@/components/CourseEdit.vue';
import DepartmentsView from '@/views/DepartmentsView.vue';
import DepartmentView from "@/components/DepartmentView.vue";
import EventsView from '@/views/EventsView.vue';
import AnalyticsView from '@/views/AnalyticsView.vue';
import HelpCenterView from '@/views/HelpCenterView.vue';
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
      path: "/instructors-view",
      name: "Instructors View",
      component: InstructorsView,
    },
    {
      path: "/instructor-create",
      name: "Instructors Create",
      component: InstructorCreate,
    },
    {
      path: "/courses-view",
      name: "Courses View",
      component: CoursesView,
    },
    {
      path: "/courses-view/:id",
      name: "Course View",
      component: CourseView,
    },
    {
      path: "/courses-create",
      name: "Course Create",
      component: CourseCreate,
    },
    {
      path: "/courses-edit/:id",
      name: "Course Edit",
      component: CourseEdit,
    },
    {
      path: "/departments-view",
      name: "Departments View",
      component: DepartmentsView,
    },
    {
      path: "/department-view/:id",
      name: "Department View",
      component: DepartmentView,
    },
    {
      path: "/events-view/",
      name: "Events View",
      component: EventsView,
    },
    {
      path: "/analytics-view/",
      name: "Analytics View",
      component: AnalyticsView
    },
    {
      path: "/help-center-view/",
      name: "Help Center View",
      component: HelpCenterView
    },
    {
      path: '/:catchAll(.*)',
      name: "not-found",
      component: NotFoundView,
    },
  
  ],
});

export default router;
