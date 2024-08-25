<script setup>
import { useRoute, RouterLink } from 'vue-router';
import { onMounted, reactive, ref, watch } from 'vue';
import { useToast } from 'vue-toastification';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import Modal from '@/components/Modal.vue';
import axios from 'axios';

const route = useRoute();
const toast = useToast();
const depID = route.params.id;
const state = reactive({
    departments: {},
    department: {
        courses_offered: []
    },
    courses: {},
    course: [],
    isLoading: true
});
const form = reactive({
    id: '',
    department_id: '',
    name: '',
    description: '',
    head_of_department: '',
    location: '',
    contact_email: '',
    contact_phone: '',
    number_of_faculty: null,
    number_of_students: null,
    courses_offered: [],
    research_add: '',
    research_areas: [],
})

const getDepartmentsData = async () => {
    try {
        const response = await axios.get(`/api/departments/`)
        state.departments = response.data
        state.departments.forEach(department => {
            if (department.department_id === depID) {
                state.department = department
                form.id = state.department.id,
                    form.department_id = state.department.department_id,
                    form.name = state.department.name,
                    form.description = state.department.description,
                    form.head_of_department = state.department.head_of_department,
                    form.location = state.department.location,
                    form.contact_email = state.department.contact_email,
                    form.contact_phone = state.department.contact_phone,
                    form.number_of_faculty = state.department.number_of_faculty,
                    form.number_of_students = state.department.number_of_students,
                    form.research_areas = state.department.research_areas
            }
        });
    } catch (error) {
        console.error('Error Fetching Department Data', error)
    } finally {
        state.isLoading = false;
    }

}
const addResearchAreas = () => {
    if (form.research_add.trim() !== '') {
        form.research_areas.push(form.research_add)
        toast.success('Research Added Successfully!')
        form.research_add = '';
    } else {
        toast.error('Research Data was not Added!');
        form.research_add = '';
    }
}
const deleteResearchAreas = (index) => {
    const confirm = window.confirm('Are you sure you want to delete?')
    if (confirm) {
        form.research_areas.splice(index, 1);
        toast.success('Research Area Deleted Successfully')
    }
}
watch(() => state.course, (newVal) => {
    if (newVal) {
        getCourses();
    }
});
const getCourses = async () => {
    const response = await axios.get('/api/courses')
    state.courses = response.data
    try {
        state.course = state.courses.filter(course => {
            return course.department === form.name &&
                !state.department.courses_offered.some(depCourse => depCourse.course_id === course.course_id) &&
                course.status === 'Active'
        })
    } catch (error) {
        console.error('No Courses Fetch')
    }
}
const formCourse = reactive({
    course_id: '',
    course_name: '',
    credits: null,
    selected: []
});

const addCourses = async (index) => {
    // Find the selected course
    state.courses.forEach(course => {
        if (course.id === index) {
            formCourse.course_id = course.course_id;
            formCourse.course_name = course.name;
            formCourse.credits = course.credits;
        }
    });

    try {
        // Fetch the current department data to retrieve the existing courses_offered array
        const departmentResponse = await axios.get(`/api/departments/${form.id}`);
        const existingCourses = departmentResponse.data.courses_offered || [];

        // Add the new course to the existing array
        const updatedCourses = [...existingCourses, {
            course_id: formCourse.course_id,
            course_name: formCourse.course_name,
            credits: Number(formCourse.credits)
        }];

        const updateCourses = {
            courses_offered: updatedCourses
        };

        // Send the updated courses array to the server
        await axios.patch(`/api/departments/${form.id}`, updateCourses);
        toast.success('Course Added Successfully')
        // Refresh the data after updating
        toggleModal();
        getDepartmentsData();
        getCourses();
    } catch (error) {
        console.error('Error Adding Course', error);
    }
};
const deleteCourse = async () => {
    if (formCourse.selected.length !== 0) {
        try {
            const departmentResponse = await axios.get(`/api/departments/${form.id}`);
            const existingCourses = departmentResponse.data.courses_offered || [];

            // Filter out courses that are not in the formCourse.selected array
            const updatedCourses = existingCourses.filter(course => !formCourse.selected.includes(course.course_id));

            // Optionally, update the department with the new list of courses
            await axios.patch(`/api/departments/${form.id}`, {
                courses_offered: updatedCourses
            });
            getDepartmentsData();
            getCourses();
            toast.success('Course Deleted Successfully')

        } catch (error) {
            console.error('Error deleting the course:', error);
        }
    } else {
        toast.error('Error Deleting: Select an Item To Delete')
    }
};
const buttonToggle = reactive({
    text: 'Edit',
    icon: 'pi-pen-to-square',
    isReadonly: true
})
const toggleEditMode = () => {
    buttonToggle.isReadonly = !buttonToggle.isReadonly;
    buttonToggle.text = buttonToggle.isReadonly ? 'Edit' : 'Save';
    buttonToggle.icon = buttonToggle.isReadonly ? 'pi-pen-to-square' : 'pi-save';
}
const toggleCheckbox = (courseId) => {
    const index = formCourse.selected.indexOf(courseId);
    if (index === -1) {
        // If courseId is not in the array, add it
        formCourse.selected.push(courseId);
    } else {
        // If courseId is already in the array, remove it
        formCourse.selected.splice(index, 1);
    }
}
const handleSubmitForm = async () => {
    const updateDepartment = {
        id: form.id,
        department_id: form.department_id,
        name: form.name,
        description: form.description,
        head_of_department: form.head_of_department,
        location: form.location,
        contact_email: form.contact_email,
        contact_phone: form.contact_phone,
        number_of_faculty: form.number_of_faculty,
        number_of_students: form.number_of_students,
        research_areas: form.research_areas,
    }
    if (buttonToggle.text === 'Save') {
        try {
            await axios.patch(`/api/departments/${form.id}`, updateDepartment);
            toast.success('Data Successfully Updated')
            getDepartmentsData();

        } catch (error) {
            console.error('Error Submitting Update', error)
            toast.error('Data was not Updated');
        }
    }
    toggleEditMode();
}
const modalActive = ref(null);
const toggleModal = () => {
    modalActive.value = !modalActive.value;
}

onMounted(() => {
    getDepartmentsData();
    getCourses();
})
</script>
<template>
    <section>
        <Modal :modalActive="modalActive" @close-modal="toggleModal" title="Select to Add Course" size="40%">
            <div class="p-4 h-[58vh]">
                <label class="block text-sm text-gray-900 font-medium whitespace-nowrap mb-6">Course Available:</label>
                <div class="w-full h-[88%] p-6 overflow-y-auto no-scrollbar bg-gray-100 rounded">
                    <div v-for="(course_available, index) in state.course"
                        class="border border-gray-800 rounded py-5 px-4 mb-5 relative">
                        <label class="block text-md text-gray-900 font-medium whitespace-nowrap">Course ID: <span
                                class="font-bold">{{
                                    course_available.course_id }}</span> </label>
                        <label class="block text-md text-gray-900 font-medium">Course Name: <span class="font-bold">{{
                            course_available.name }}</span> </label>
                        <label class="block text-md text-gray-900 font-medium whitespace-nowrap">Credits: <span
                                class="font-bold">{{ course_available.credits }}</span></label>
                        <button @click="addCourses(course_available.id)"
                            class="absolute top-8 right-10 text-xl font-semibold px-6 py-2 rounded-full bg-green-400 hover:bg-green-600">Add</button>
                    </div>
                </div>
            </div>
        </Modal>
        <div class="flex mb-5">
            <RouterLink to="/departments-view"
                class="flex flex-row items-center text-sm font-medium text-gray-900 bg-gray-300 ml-4 p-2 rounded-lg hover:bg-gray-700 hover:text-gray-50 transition ease-in-out">
                <i class="pi pi-arrow-circle-left pr-2"></i>
                <div>Back</div>
            </RouterLink>
        </div>
        <div v-if="state.isLoading"
            class="text-center text-gray-500 h-[70vh]  mx-auto flex justify-center items-center">
            <PulseLoader />
        </div>
        <div v-else class="container mx-auto flex gap-x-4 px-10 relative">
            <form @submit.prevent="handleSubmitForm" class="bg-gray-100 w-[69%] flex flex-col p-8 rounded">
                <div class="flex gap-x-4 mb-4">
                    <div class="w-[25%]">
                        <label class="block text-sm text-gray-900 font-medium mb-2">Department ID:</label>
                        <input v-model="form.department_id" readonly
                            class="border bg-gray-300 border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5"
                            type="text">
                    </div>
                    <div class="flex-1">
                        <label class="block text-sm text-gray-900 font-medium mb-2">Name:</label>
                        <input v-model="form.name" :readonly="buttonToggle.isReadonly"
                            :class="['border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5', buttonToggle.isReadonly ? 'bg-gray-300' : 'bg-white']"
                            type="text">
                    </div>
                </div>
                <div class="flex gap-x-4 mb-4">
                    <div class="flex-1">
                        <label class="block text-sm text-gray-900 font-medium mb-2">Head of Department:</label>
                        <input v-model="form.head_of_department" :readonly="buttonToggle.isReadonly"
                            :class="['border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5', buttonToggle.isReadonly ? 'bg-gray-300' : 'bg-white']"
                            type="text">
                    </div>
                    <div class="">
                        <label class="block text-sm text-gray-900 font-medium mb-2 whitespace-nowrap">Number of
                            Students:</label>
                        <input v-model.number="form.number_of_students" :readonly="buttonToggle.isReadonly"
                            :class="['border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5', buttonToggle.isReadonly ? 'bg-gray-300' : 'bg-white']"
                            type="number">
                    </div>
                    <div class="">
                        <label class="block text-sm text-gray-900 font-medium mb-2 whitespace-nowrap">Number of
                            Faculty:</label>
                        <input v-model.number="form.number_of_faculty" :readonly="buttonToggle.isReadonly"
                            :class="['border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5', buttonToggle.isReadonly ? 'bg-gray-300' : 'bg-white']"
                            type="number">
                    </div>
                </div>
                <div class="flex gap-x-4 mb-4">
                    <div class="flex-1">
                        <label class="block text-sm text-gray-900 font-medium mb-2 whitespace-nowrap">Location:</label>
                        <input v-model="form.location" :readonly="buttonToggle.isReadonly"
                            :class="['border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5', buttonToggle.isReadonly ? 'bg-gray-300' : 'bg-white']"
                            type="text">
                    </div>
                    <div>
                        <label class="block text-sm text-gray-900 font-medium mb-2 whitespace-nowrap">Contact
                            Email:</label>
                        <input v-model="form.contact_email" :readonly="buttonToggle.isReadonly"
                            :class="['border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5', buttonToggle.isReadonly ? 'bg-gray-300' : 'bg-white']"
                            type="email">
                    </div>
                    <div>
                        <label class="block text-sm text-gray-900 font-medium mb-2 whitespace-nowrap">Contact
                            Phone:</label>
                        <input v-model="form.contact_phone" :readonly="buttonToggle.isReadonly"
                            :class="['border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5', buttonToggle.isReadonly ? 'bg-gray-300' : 'bg-white']"
                            type="text">
                    </div>
                </div>
                <div class="mb-4">
                    <div class="w-full">
                        <label class="block text-sm text-gray-900 font-medium mb-2 whitespace-nowrap">Research
                            Areas:</label>
                        <div class="flex gap-x-4 w-[100%]">
                            <div class="grid grid-cols-3 gap-x-2 gap-y-4 w-[70%] items-center">
                                <div v-for="(area, index) in form.research_areas"
                                    :class="['bg-blue-100 px-3 py-2.5 rounded-full flex items-center gap-x-2', buttonToggle.isReadonly ? 'bg-gray-300' : 'bg-blue-100']">
                                    <button type="button" @click="deleteResearchAreas(index)"
                                        :disabled="buttonToggle.isReadonly"
                                        :class="['pi pi-times-circle text-gray-800 text-1xl', buttonToggle.isReadonly ? '' : 'hover:text-red-800']"></button>
                                    <label class="text-sm text-gray-900 font-medium">
                                        {{ area }}</label>
                                </div>
                            </div>
                            <div class="relative w-[28%] h-12">
                                <input v-model="form.research_add" :readonly="buttonToggle.isReadonly"
                                    :class="['border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5', buttonToggle.isReadonly ? 'bg-gray-300' : 'bg-white']"
                                    type="text">
                                <button type="button" @click="addResearchAreas" :disabled="buttonToggle.isReadonly"
                                    :class="['absolute top-[16%] right-2  px-2 py-1 rounded text-sm font-semibold', buttonToggle.isReadonly ? 'bg-green-300' : 'bg-green-400 hover:bg-green-600']">
                                    <i class="pi pi-plus text-sm"></i>
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="h-[20%]">
                        <label
                            class="block text-sm text-gray-900 font-medium mb-2 whitespace-nowrap">Description:</label>
                        <textarea v-model="form.description" :readonly="buttonToggle.isReadonly"
                            :class="['border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5 no-scrollbar', buttonToggle.isReadonly ? 'bg-gray-300' : 'bg-white']"
                            type="text"></textarea>
                    </div>
                </div>
                <div class="flex flex-row-reverse mt-6">
                    <button type="submit"
                        :class="['px-4 py-3 rounded-lg text-gray-800 font-semibold', buttonToggle.isReadonly ? 'bg-green-400 hover:bg-green-600' : 'bg-blue-400 hover:bg-blue-600']"><i
                            :class="['pi mr-2', buttonToggle.icon]"></i>{{ buttonToggle.text }}</button>
                </div>
            </form>
            <div class="bg-gray-100 w-[30%] p-6 absolute top-0 right-4 rounded h-[100%]">
                <label class="block text-sm text-gray-900 font-medium whitespace-nowrap">Course Offered:</label>
                <div class="w-full h-[80%] my-4 p-6 overflow-y-auto no-scrollbar bg-white">
                    <div v-for="course_offered in state.department.courses_offered" :key="course_offered.course_id"
                        class="border border-gray-800 rounded py-5 px-4 mb-5 relative cursor-pointer"
                        @click="toggleCheckbox(course_offered.course_id)">
                        <label class="block text-md text-gray-900 font-medium whitespace-nowrap cursor-pointer">
                            Course ID: <span class="font-bold">{{ course_offered.course_id }}</span>
                        </label>
                        <label class="block text-md text-gray-900 font-medium cursor-pointer">
                            Course Name: <span class="font-bold">{{ course_offered.course_name }}</span>
                        </label>
                        <label class="block text-md text-gray-900 font-medium whitespace-nowrap cursor-pointer">
                            Credits: <span class="font-bold">{{ course_offered.credits }}</span>
                        </label>
                        <input type="checkbox" v-model="formCourse.selected" :value="course_offered.course_id"
                            class="absolute top-5 right-5 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer">
                    </div>
                </div>
                <div class="flex gap-x-4 mx-6 text-md font-semibold text-gray-700">
                    <button @click="toggleModal();" class="bg-green-400 py-2 flex-1 rounded-lg hover:bg-green-600"><i
                            class="pi pi-file-plus mr-2"></i>Add</button>
                    <button @click="deleteCourse()" class="bg-red-400 py-2 flex-1 rounded-lg hover:bg-red-600"><i
                            class="pi pi-trash mr-2"></i>Delete</button>
                </div>
            </div>
        </div>
        <div class="flex justify-center mt-4">
            <div class="text-center">
                <label class="block text-sm text-gray-900 font-medium mb-2 whitespace-nowrap">Website: <span
                        class="font-bold">{{ state.department.website }}</span></label>
                <label class="block text-sm text-gray-900 font-medium mb-2 whitespace-nowrap">Established Year: <span
                        class="font-bold">{{ state.department.established_year }}</span></label>
            </div>
        </div>
    </section>
</template>