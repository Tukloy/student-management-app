<script setup>
import { onMounted, reactive, computed } from 'vue';
import { useToast } from 'vue-toastification';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';


const toast = useToast();
const route = useRoute();
const courseID = route.params.id
const router = useRouter();
const state = reactive({
    courses: {},
    course: {},
    instructors: {},
    departments: {}
});
const form = reactive({
    id: '',
    course_id: '',
    name: '',
    description: '',
    credits: null,
    category: '',
    instructor_id: '',
    schedule: {
        days: [],
        time: '',
        location: '',
    },
    semester: '1st Sem',
    status: 'Active',
    department: '',
    evaluation_method: ''

})
const getCourseId = async () => {
    try {
        const response = await axios.get('/api/courses');
        state.courses = response.data;

        // Compute the last ID immediately after setting the state
        const lastId = Math.max(...state.courses.map(course => parseInt(course.id, 10))) + 1;
        form.id = lastId;

    } catch (error) {
        console.error('Error fetching course Id', error);
    }
};
const getInstructorsData = async () => {
    try {
        const response = await axios.get('/api/instructors');
        state.instructors = response.data
    } catch (error) {
        console.error('Error Fetching Course Instructor Data', error)
    }
}
const getDepartmentsData = async () => {
    try {
        const response = await axios.get('/api/departments');
        state.departments = response.data
    } catch (error) {
        console.error('Error Fetching Departments Data', error);
    }
}
const getCourseData = async () => {
    try {
        const response = await axios.get(`/api/courses/${courseID}`);
        state.course = response.data
        //Flood Data to input
        form.course_id = state.course.course_id
        form.name = state.course.name
        form.category = state.course.category
        form.credits = state.course.credits
        form.instructor_id = state.course.instructor_id
        form.department = state.course.department
        form.evaluation_method = state.course.evaluation_method
        form.semester = state.course.semester
        form.schedule.days = state.course.schedule.days
        form.schedule.time = state.course.schedule.time
        form.schedule.location = state.course.schedule.location
        form.description = state.course.description
        form.status = state.course.status
    } catch (error) {
        console.error('Error Fetching Course Data', error);
    }
}
const handleSubmit = async () => {
    const updateCourse = {
        course_id: form.course_id.toUpperCase(),
        name: form.name,
        description: form.description,
        credits: String(form.credits),
        category: form.category,
        instructor_id: form.instructor_id,
        schedule: {
            days: form.schedule.days,
            time: form.schedule.time,
            location: form.schedule.location,
        },
        semester: form.semester,
        status: form.status,
        department: form.department,
        evaluation_method: form.evaluation_method
    }
    try {
        await axios.put(`/api/courses/${courseID}`, updateCourse)
        toast.success('Course Updated Successfully');
        router.push(`/courses-view/${courseID}`);
    } catch (error) {
        console.log('Error Course not updated', error)
        toast.error('Course Was not Updated!')
    }
}

onMounted(() => {
    getCourseId();
    getCourseData();
    getInstructorsData();
    getDepartmentsData();
})
</script>
<template>
    <section>
        <div class="flex">
            <RouterLink :to="`/courses-view/${courseID}`"
                class="flex flex-row items-center text-sm font-medium text-gray-900 bg-gray-300 ml-4 p-2 rounded-lg hover:bg-gray-700 hover:text-gray-50 transition ease-in-out">
                <i class="pi pi-arrow-circle-left pr-2"></i>
                <div>Back</div>
            </RouterLink>
        </div>
        <div class="container mx-auto">
            <form @submit.prevent="handleSubmit" class="bg-gray-100 p-10 rounded m-8">
                <label class="block -ml-2 text-sm mb-4 font-medium text-gray-900">Please complete the form below to
                    create.</label>
                <div class="flex gap-x-4 mb-4">
                    <div class="w-[13%]">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Course ID:</label>
                        <input v-model="form.course_id"
                            class="border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5"
                            type="text">
                    </div>
                    <div class="flex-1">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Course Name:</label>
                        <input v-model="form.name"
                            class="border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5"
                            type="text">
                    </div>
                    <div class="flex-1">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Category:</label>
                        <select v-model="form.category"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option disabled>Select a category</option>
                            <option value="General Education">General Education</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="Social Sciences">Social Sciences</option>
                            <option value="Natural Sciences">Natural Sciences</option>
                            <option value="Humanities">Humanities</option>
                            <option value="Arts">Arts</option>
                            <option value="Foreign Languages">Foreign Languages</option>
                        </select>
                    </div>
                    <div class="w-[10%]">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Credits:</label>
                        <input v-model.number="form.credits"
                            class="border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5"
                            type="number">
                    </div>
                </div>
                <div class="flex gap-x-4 mb-4">
                    <div class="flex-1">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Instructor:</label>
                        <select v-model="form.instructor_id"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option disabled>Select Instructor</option>
                            <option v-for="instructor in state.instructors" :key="state.instructors.id"
                                :value="instructor.instructor_id">{{ instructor.firstname + " " +
                                    instructor.lastname }}</option>
                        </select>
                    </div>
                    <div class="flex-1">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Departments:</label>
                        <select v-model="form.department"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option disabled>Select Department</option>
                            <option v-for="department in state.departments" :key="state.departments.id"
                                :value="department.name">{{ department.name }}</option>
                        </select>
                    </div>
                    <div class="flex-1">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Evaluation Method:</label>
                        <input v-model="form.evaluation_method"
                            class="border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5"
                            type="text">
                    </div>
                    <div class="w-[12%]">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Semester:</label>
                        <select v-model="form.semester"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option value="1st Sem">1st Sem</option>
                            <option value="2nd Sem">2nd Sem</option>
                            <option value="Fall 2024">Fall 2024</option>
                        </select>
                    </div>
                </div>
                <div class="flex gap-x-4 mb-4">
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900">Days Available:</label>
                        <div class="grid xl:grid-cols-3 md:grid-cols-1">
                            <div class="flex items-center">
                                <input type="checkbox" v-model="form.schedule.days" value="Monday"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label class="ms-1 text-sm font-medium text-gray-900 dark:text-gray-900">Monday</label>
                            </div>
                            <div class="flex items-center">
                                <input type="checkbox" v-model="form.schedule.days" value="Tuesday"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label class="ms-1 text-sm font-medium text-gray-900 dark:text-gray-900">Tuesday</label>
                            </div>
                            <div class="flex items-center">
                                <input type="checkbox" v-model="form.schedule.days" value="Wednesday"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label
                                    class="ms-1 text-sm font-medium text-gray-900 dark:text-gray-900">Wednesday</label>
                            </div>
                            <div class="flex items-center">
                                <input type="checkbox" v-model="form.schedule.days" value="Thursday"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label
                                    class="ms-1 text-sm font-medium text-gray-900 dark:text-gray-900">Thursday</label>
                            </div>
                            <div class="flex items-center">
                                <input type="checkbox" v-model="form.schedule.days" value="Friday"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label class="ms-1 text-sm font-medium text-gray-900 dark:text-gray-900">Friday</label>
                            </div>
                            <div class="flex items-center">
                                <input type="checkbox" v-model="form.schedule.days" value="Saturday"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label
                                    class="ms-1 text-sm font-medium text-gray-900 dark:text-gray-900">Saturday</label>
                            </div>
                        </div>
                    </div>
                    <div class="w-[13%]">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Time</label>
                        <input v-model="form.schedule.time"
                            class="border border-gray-300 text-sm text-center rounded focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5"
                            type="text">
                    </div>
                    <div class="flex-1">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Location:</label>
                        <input v-model="form.schedule.location"
                            class="border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5"
                            type="text">
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900">Status:</label>
                        <select v-model="form.status"
                            class="border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5">
                            <option value="Active">Active</option>
                            <option vlaue="Inactive">Inactive</option>
                        </select>
                    </div>
                </div>
                <div class="flex gap-x-4 mb-9">
                    <div class="flex-1">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Description:</label>
                        <textarea v-model="form.description"
                            class="w-full px-5 py-2 h-24 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full no-scrollbar"></textarea>
                    </div>
                </div>
                <div class="flex flex-row-reverse">
                    <button class="btn hover:bg-blue-300 bg-blue-700 cursor-pointer">
                        <i class="pi pi-save"></i>
                        Update
                    </button>
                </div>
            </form>
        </div>
    </section>
</template>