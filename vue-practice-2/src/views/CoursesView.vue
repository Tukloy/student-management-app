<script setup>
import { onMounted, reactive } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import axios from 'axios';

const state = reactive({
    courses: {},
    isLoading: true
})
const getCoursesData = async () => {
    try {
        const response = await axios.get('/api/courses');
        state.courses = response.data
    } catch (error) {
        console.error('Error Fetching Courses Data', error);
    } finally {
        state.isLoading = false
    }
}

onMounted(() => {
    getCoursesData();
})
</script>
<template>
    <section>
        <div>test</div>
        <div class="container mx-auto px-6 py-2">
            <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
                <PulseLoader />
            </div>
            <div v-else class="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 gap-y-8 gap-x-5">
                <div v-for="course in state.courses" :key="state.courses.id"
                    class="bg-blue-100 p-6 flex flex-col rounded-lg text-gray-700 transform hover:scale-105 ease-in-out duration-100 cursor-pointer shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[2px_2px_12px_5px_#63b3ed,0px_3px_8px_0px_#00000024]">
                    <label class="font-bold text-2xl mb-3">{{ course.course_id }}</label>
                    <label class="font-semibold text-lg mb-2">{{ course.name }}</label>
                    <label class="font-medium text-sm mb-3">{{ course.description }}</label>
                    <label class="font-medium text-md">Credits {{ course.credits }}</label>
                    <label class="font-semibold text-lg">{{ course.category }}</label>
                </div>
            </div>
        </div>
    </section>
</template>