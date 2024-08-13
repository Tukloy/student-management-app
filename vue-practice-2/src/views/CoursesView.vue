<script setup>
import { onMounted, reactive, computed } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { RouterLink } from 'vue-router';
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
const truncateText = (text, length) => {
    const result = text.length > length ? text.substring(0, length) + '...' : text;
    return result;
};
const searchQuery = reactive({
    filterTable: '',
});
const isNonEmptyString = (value) => {
    return typeof value === 'string' && value.trim().length > 0;
};

const filteredTableData = computed(() => {
    if (!isNonEmptyString(searchQuery.filterTable)) {
        return state.courses;
    }
    const query = searchQuery.filterTable.toLowerCase();
    return state.courses.filter(course =>
        (course.course_id && course.course_id.toLowerCase().includes(query)) ||
        (course.name && course.name.toLowerCase().includes(query)) ||
        (course.category && course.category.toLowerCase().includes(query)) ||
        (course.deparment && course.deparment.toLowerCase().includes(query))
    );
});
onMounted(() => {
    getCoursesData();
})
</script>
<template>
    <section>
        <div class="flex justify-between items-baseline mx-auto">
            <RouterLink to="/courses-create">
                <div class="btn bg-blue-500 ml-4 mb-3"><i class="pi pi-file-plus mr-2"></i>Create</div>
            </RouterLink>

            <div class="w-[22vw] mr-8 relative">
                <input
                    class="w-full p-2.5 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  focus:outline-none block"
                    type="text" v-model="searchQuery.filterTable" placeholder="Search..." />
                <div class="absolute right-4 top-2.5">
                    <i class="pi pi-search"></i>
                </div>
            </div>
        </div>
        <div class="container mx-auto px-6 py-2">
            <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
                <PulseLoader />
            </div>
            <div v-else>
                <div class="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 gap-y-8 gap-x-5">
                    <div v-for="course in filteredTableData" :key="state.courses.id" :class="{
                        'bg-blue-100 p-6 flex flex-col rounded-lg text-gray-700 transform hover:scale-105 ease-in-out duration-100 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[2px_2px_12px_5px_#63b3ed,0px_3px_8px_0px_#00000024]': true,
                        'bg-red-200': course.status === 'Inactive'
                    }">
                        <label class="font-bold text-2xl mb-3">{{ course.course_id }}</label>
                        <label class="font-semibold text-lg mb-2 whitespace-nowrap">{{ course.name }}</label>
                        <label class="font-medium text-sm mb-3">{{ truncateText(course.description, 90) }}</label>
                        <label class="font-medium text-md">Credits {{ course.credits }}</label>
                        <label class="font-semibold text-lg">{{ course.category }}</label>
                        <RouterLink :to="'/courses-view/' + course.id"
                            class="flex flex-row-reverse text-xl hover:text-blue-500 ease-out duration-300"><i
                                class="pi pi-eye"></i></RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>