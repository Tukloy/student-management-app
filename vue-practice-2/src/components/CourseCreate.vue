<script setup>
import { onMounted, reactive, computed } from 'vue';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { parse } from 'vue/compiler-sfc';


const toast = useToast();
const router = useRouter();
const state = reactive({
    courses: {},
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
        time: {
            from: '',
            to: ''
        },
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
const handleSubmit = async () => {
    let getTimeString1 = form.schedule.time.from;
    let getTimeString2 = form.schedule.time.to;
    getTimeString1 = getTimeString1.substring(0, 2)
    getTimeString2 = getTimeString2.substring(0, 2)
    let timeAP1 = '';
    let timeAP2 = '';
    if (parseInt(getTimeString1, 10) >= 0 && parseInt(getTimeString1, 10) < 12) {
        timeAP1 = 'AM'
    } else if (parseInt(getTimeString1, 10) >= 12 && parseInt(getTimeString1, 10) < 24) {
        timeAP1 = 'PM'
    }
    if (parseInt(getTimeString2, 10) >= 0 && parseInt(getTimeString2, 10) < 12) {
        timeAP2 = 'AM'
    } else if (parseInt(getTimeString2, 10) >= 12 && parseInt(getTimeString2, 10) < 24) {
        timeAP2 = 'PM'
    }
    const newCourse = {
        id: String(form.id),
        course_id: form.course_id.toUpperCase(),
        name: form.name,
        description: form.description,
        credits: String(form.credits),
        category: form.category,
        instructor_id: form.instructor_id,
        schedule: {
            days: form.schedule.days,
            time: form.schedule.time.from + " " + timeAP1 + " - " + form.schedule.time.to + " " + timeAP2,
            location: form.schedule.location,
        },
        semester: form.semester,
        status: form.status,
        department: form.department,
        evaluation_method: form.evaluation_method
    }
    try {
        await axios.post('/api/courses', newCourse)
        toast.success('Course Added Successfully');
        router.push('/courses-view');
    } catch (error) {
        console.log('Error Course not added', error)
        toast.error('Course Was not Added!')
    }
}
const isNonEmptyString = (value) => {
    return typeof value === 'string' && value.trim().length > 0;
};

const isFormValid = computed(() => {
    const stringCredits = form.credits !== null ? String(form.credits) : '';
    const daysArray = form.schedule.days;
    const stringDays = daysArray.join(', ')
    const result = (
        isNonEmptyString(form.course_id) &&
        isNonEmptyString(form.name) &&
        isNonEmptyString(form.description) &&
        isNonEmptyString(form.category) &&
        isNonEmptyString(form.evaluation_method) &&
        isNonEmptyString(form.instructor_id) &&
        isNonEmptyString(stringDays) &&
        isNonEmptyString(form.schedule.time.from) &&
        isNonEmptyString(form.schedule.time.to) &&
        isNonEmptyString(form.schedule.location) &&
        isNonEmptyString(form.semester) &&
        isNonEmptyString(form.department) &&
        isNonEmptyString(stringCredits)
    );
    return result;
});
onMounted(() => {
    getCourseId();
    getInstructorsData();
    getDepartmentsData();
})
</script>
<template>
    <section>
        <div class="flex">
            <RouterLink to="/courses-view"
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
                    <div class="w-[10%]">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Time from:</label>
                        <input v-model="form.schedule.time.from"
                            class="border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5"
                            type="time">
                    </div>
                    <div class="w-[10%]">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Time to:</label>
                        <input v-model="form.schedule.time.to"
                            class="border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5"
                            type="time">
                    </div>
                    <div class="flex-1">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Location:</label>
                        <input v-model="form.schedule.location"
                            class="border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5"
                            type="text">
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
                    <button :class="{
                        'btn': true,
                        'pointer-events-none bg-blue-300': !isFormValid,
                        'bg-blue-700 cursor-pointer': isFormValid
                    }" :disabled="!isFormValid">
                        <i class="pi pi-save"></i>
                        Save
                    </button>
                </div>
            </form>
        </div>
    </section>
</template>