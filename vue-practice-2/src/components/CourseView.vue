<script setup>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { reactive, onMounted, computed } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import { useToast } from 'vue-toastification';
import generalEducationImg from '@/assets/image/general education.png';
import ArtsImg from '@/assets/image/arts.png';
import ForeignLanguageImg from '@/assets/image/foreign language.png';
import humanitiesImg from '@/assets/image/humanities.png';
import mathematicsImg from '@/assets/image/mathematics.png';
import naturalScienceImg from '@/assets/image/natural science.png';
import socialScienceImg from '@/assets/image/social science.png'
import { watch } from 'vue';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const toast = useToast();
const courseId = route.params.id;

const state = reactive({
    course: {},
    instructors: {},
    instructorName: '',
    isLoading: true
})
const getCourseData = async () => {
    try {
        const response = await axios.get(`/api/courses/${courseId}`)
        state.course = response.data
    } catch (error) {
        console.error('Error Fetching Course Data', error)
    } finally {
        state.isLoading = false
    }
}
const imageSrc = computed(() => {
    const imgCat = state.course.category.toLowerCase();
    switch (imgCat) {
        case 'general education':
            return generalEducationImg;
        case 'arts':
            return ArtsImg;
        case 'foreign languages':
            return ForeignLanguageImg;
        case 'humanities':
            return humanitiesImg;
        case 'mathematics':
            return mathematicsImg;
        case 'natural sciences':
            return naturalScienceImg;
        case 'social sciences':
            return socialScienceImg;
        default:
            return require('@/assets/image/general education.png')
    }
})
watch(() => state.course.instructor_id, (newVal) => {
    if (newVal) {
        getInstructorName();
    }
});
const getInstructorName = async () => {
    try {
        const response = await axios.get(`/api/instructors`);
        state.instructors = response.data

        state.instructors.forEach(instructor => {
            if (instructor.instructor_id === state.course.instructor_id) {
                state.instructorName = instructor.firstname + " " + instructor.lastname
            }
        });
    } catch (error) {
        console.error('Error Fetching Instructor Name', error)
    }
}
const deleteCourse = async () => {
    try {
        const confirm = window.confirm('Are you sure you want to delete?')
        if (confirm) {
            await axios.delete(`/api/courses/${courseId}`)
            toast.success('Course Deleted Successfully');
            router.push('/courses-view');
        }
    } catch (error) {
        console.error('Error Deleting Course')
        toast.error('Course Was not Deleted');
    }
}
onMounted(() => {
    getCourseData();
    getInstructorName()
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
        <div v-if="state.isLoading"
            class="text-center text-gray-500 h-[70vh]  mx-auto flex justify-center items-center">
            <PulseLoader />
        </div>
        <div v-else class="container mx-auto px-7 py-7">
            <div class="container flex gap-x-4 w-full relative">
                <div class="flex w-[70%] flex-col px-8 py-10 bg-gray-100 rounded">
                    <div class="flex w-full gap-x-4 justify-between mb-8">
                        <div class="text-gray-700 text-md w-[70%]">
                            <label class="block mb-3">Course ID: <span class="font-bold text-xl">{{
                                    state.course.course_id }}</span></label>
                            <label class="block">Name: <span class="font-semibold">{{ state.course.name
                                    }}</span></label>
                            <label class="block">Category: <span class="font-semibold">{{ state.course.category
                                    }}</span></label>
                            <label class="block mb-6">Credits: <span class="text-md font-semibold">{{
                                    state.course.credits }}</span></label>
                            <label class="block">Schedule:</label>
                            <label class="block">Days: <span class="font-medium">{{ state.course.schedule.days
                                    }}</span></label>
                            <label class="block">Time: <span class="font-medium">{{ state.course.schedule.time
                                    }}</span></label>
                            <label class="block">Location: <span class="font-medium">{{ state.course.schedule.location
                                    }}</span></label>
                            <label class="block mb-6">Semester: <span class="font-medium">{{ state.course.semester
                                    }}</span></label>
                            <label class="block">Department: <span class="font-semibold">{{ state.course.department
                                    }}</span></label>
                            <label class="block">Evaluation Method: <span class="font-semibold">{{
                                state.course.evaluation_method }}</span></label>
                        </div>
                        <div class="w-[30%] text-right text-md group">
                            <div
                                class="relative rounded-2xl shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] mb-3">
                                <img class="w-full h-auto rounded-2xl" :src="imageSrc" alt="">
                                <span
                                    class="absolute cursor-pointer w-full h-full bottom-0 right-0 flex flex-col-reverse bg-gradient-to-t from-gray-700 text-2xl rounded-lg font-bold text-gray-100 px-3 py-1 rounded-2xl transform translate-y-5 opacity-0 transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100"><span
                                        class="mb-3">{{ state.course.course_id }}</span></span>
                            </div>
                            <div class="mr-2 whitespace-nowrap">Instructor: <span class="text-md font-semibold">{{
                                state.instructorName }}</span></div>
                            <div class="mr-2">Status: <span class="text-md font-semibold">{{ state.course.status
                                    }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="text-gray-800">
                        <label class="text-md block mb-2">Description:</label>
                        <label class="text-sm font-semibold">{{ state.course.description }}</label>
                    </div>
                </div>
                <div class="w-[30%] bg-gray-100 rounded p-8 flex flex-col gap-y-8 absolute top-0 -right-3">
                    <div class="flex-1 rounded-lg">
                        <img class="max-w-full rounded-lg" :src="imageSrc" :alt="state.course.category">
                    </div>
                    <div class="flex-2 flex flex-col justify-center gap-y-4 px-6 font-semibold">
                        <RouterLink :to="'/courses-edit/' + courseId"
                            class="bg-green-700 text-gray-50 py-2 rounded hover:bg-green-600 text-center">
                            Edit Course
                        </RouterLink>
                        <button @click="deleteCourse"
                            class="bg-red-700 text-gray-50 py-2 rounded hover:bg-red-600">Delete Course</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>