<script setup>
import { onMounted, reactive, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { useToast } from 'vue-toastification';
import Modal from '@/components/Modal.vue';

const router = useRouter();
const toast = useToast();
const searchQuery = reactive({
    filterTable: '',
});

const isNonEmptyString = (value) => {
    return typeof value === 'string' && value.trim().length > 0;
};

const filteredTableData = computed(() => {
    if (!isNonEmptyString(searchQuery.filterTable)) {
        return state.instructors;
    }
    const query = searchQuery.filterTable.toLowerCase();
    return state.instructors.filter(instructor =>
        (instructor.firstname && instructor.firstname.toLowerCase().includes(query)) ||
        (instructor.lastname && instructor.lastname.toLowerCase().includes(query)) ||
        (instructor.instructor_id && instructor.instructor_id.toLowerCase().includes(query)) ||
        (instructor.email && instructor.email.toLowerCase().includes(query)) ||
        (instructor.phone && String(instructor.phone).toLowerCase().includes(query)) ||
        (instructor.address && instructor.address.toLowerCase().includes(query)) ||
        (instructor.type && instructor.type.toLowerCase().includes(query))
    );
});
const state = reactive({
    instructors: {},
    instructor: {},
    isLoading: true
});
const form = reactive({
    id: '',
    instructor_id: '',
    firstname: '',
    lastname: '',
    gender: 'Male',
    phone: null,
    email: '',
    address: '',
    department: '',
    type: '',
})
const getInstructorsData = async () => {
    try {
        const response = await axios.get('/api/instructors');
        state.instructors = response.data;
    } catch (error) {
        console.error('Error Fetching Instructors Data', error);
    } finally {
        state.isLoading = false
    }
}
const getInstructorData = async (instructorId) => {
    toggleModal();
    try {
        const response = await axios.get(`/api/instructors/${instructorId}`);
        state.instructor = response.data;
        form.instructor_id = state.instructor.instructor_id;
        form.firstname = state.instructor.firstname;
        form.lastname = state.instructor.lastname;
        form.gender = state.instructor.gender;
        form.phone = Number(state.instructor.phone);
        form.address = state.instructor.address;
        form.email = state.instructor.email;
        form.department = state.instructor.department;
        form.type = state.instructor.type;
    } catch (error) {
        console.error('Error Fetching Instructor Data', error);
        toast.error('Error fetching Instructor Data')
    }
}
const handleSubmit = async () => {
    const formPhone = String(form.phone);
    const updateStudent = {
        instructor_id: form.instructor_id,
        firstname: form.firstname,
        lastname: form.lastname,
        gender: form.gender,
        phone: formPhone,
        address: form.address,
        email: form.email,
        department: form.department,
        type: form.type
    }
    if (modalText.value === 'Save') {
        try {
            await axios.put(`/api/instructors/${state.instructor.id}`, updateStudent)
            getInstructorsData();
            toast.success('Instructor Updated Successfully')
        } catch (error) {
            console.error('Error Updating Instructor', error)
            toast.error('Instructor was not Updated')
        } finally {
            toggleEditMode(),
                toggleModal();
        }
    } else {
        toggleEditMode();
    }
}
const deleteStudent = async (instructorId) => {
    try {
        const confirm = window.confirm('Are you sure you want to delete?')
        if (confirm) {
            await axios.delete(`/api/instructors/${instructorId}`);
            getInstructorsData();
            toast.success('Instructor Deleted Successfully');
        }
    } catch (error) {
        console.error('Error Deleting Instructor', error)
        toast.error('Instructor was Not Deleted');
    }
}
const truncateText = (text, length) => {
    const result = text.length > length ? text.substring(0, length) + '...' : text;
    return result;
};
onMounted(() => {
    getInstructorsData();
});

//modal
const modalActive = ref(null);
const isReadonly = ref(true);
const modalText = ref('Edit');
const toggleEditMode = () => {
    isReadonly.value = !isReadonly.value;
    modalText.value = isReadonly.value ? 'Edit' : 'Save';
}
const toggleModal = () => {
    modalText.value = 'Edit';
    isReadonly.value = true;
    modalActive.value = !modalActive.value;
    router.push('/instructors-view');
}
</script>
<template>
    <section>
        <Modal :modalActive="modalActive" @close-modal="toggleModal" title="Instructor Information">
            <div class="p-5 md:p-6 !scroll-smooth">
                <form class="space-y-4 flex flex-col" @submit.prevent="handleSubmit">
                    <div class="flex flex-row gap-x-4">
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900">Instructor ID:</label>
                            <input v-model="form.instructor_id" type="text" readonly :class="{
                                'border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5': true, 'bg-gray-50  text-gray-900': isReadonly === false,
                                'bg-gray-300 text-gray-50': isReadonly === true
                            }" required />
                        </div>
                        <div class="flex-1">
                            <label class="block mb-2 text-sm font-medium text-gray-900">Firstname:</label>
                            <input v-model="form.firstname" type="text" :readonly="isReadonly" :class="{
                                'border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5': true, 'bg-gray-50  text-gray-900': isReadonly === false,
                                'bg-gray-300 text-gray-50': isReadonly === true
                            }" required />
                        </div>
                        <div class="flex-1">
                            <label class="block mb-2 text-sm font-medium text-gray-900">Lastname:</label>
                            <input v-model="form.lastname" type="text" :readonly="isReadonly" :class="{
                                'border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5': true, 'bg-gray-50  text-gray-900': isReadonly === false,
                                'bg-gray-300 text-gray-50': isReadonly === true
                            }" required />
                        </div>
                    </div>
                    <div class="flex flex-row gap-x-4">
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900">Gender:</label>
                            <select v-model="form.gender" name="gender" id="gender" :disabled="isReadonly" :class="{
                                'border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5': true, 'bg-gray-50  text-gray-900': isReadonly === false,
                                'bg-gray-300 text-gray-50': isReadonly === true
                            }">
                                <option value="Male">Male</option>
                                <option vlaue="Female">Female</option>
                            </select>
                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900">Contact No:</label>
                            <input v-model.number="form.phone" type="number" :readonly="isReadonly" :class="{
                                'border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5': true, 'bg-gray-50  text-gray-900': isReadonly === false,
                                'bg-gray-300 text-gray-50': isReadonly === true
                            }" required />
                        </div>
                        <div class="flex-1">
                            <label class="block mb-2 text-sm font-medium text-gray-900">Email:</label>
                            <input v-model="form.email" type="email" :readonly="isReadonly" :class="{
                                'border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5': true, 'bg-gray-50  text-gray-900': isReadonly === false,
                                'bg-gray-300 text-gray-50': isReadonly === true
                            }" required />
                        </div>
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900">Address:</label>
                        <input v-model="form.address" type="text" :readonly="isReadonly" :class="{
                            'border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5': true, 'bg-gray-50  text-gray-900': isReadonly === false,
                            'bg-gray-300 text-gray-50': isReadonly === true
                        }" required />
                    </div>
                    <div class="flex flex-row gap-x-4">
                        <div class="flex-1">
                            <label class="block mb-2 text-sm font-medium text-gray-900">Department:</label>
                            <input v-model="form.department" type="text" :readonly="isReadonly" :class="{
                                'border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5': true, 'bg-gray-50  text-gray-900': isReadonly === false,
                                'bg-gray-300 text-gray-50': isReadonly === true
                            }" required />
                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900">Type:</label>
                            <select v-model="form.type" name="gender" id="gender" :disabled="isReadonly" :class="{
                                'border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5': true, 'bg-gray-50  text-gray-900': isReadonly === false,
                                'bg-gray-300 text-gray-50': isReadonly === true
                            }">
                                <option value="Full-Time">Full-Time</option>
                                <option vlaue="Part-Time">Part-Time</option>
                            </select>
                        </div>
                    </div>
                    <div class="border-t rounded-t mt-2 flex justify-end">
                        <div>
                            <button :class="{
                                'border text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none focus:outline-none focus:shadow-outline': true,
                                'bg-green-500 hover:bg-green-700': modalText === 'Edit', 'bg-blue-500 hover:bg-blue-700': modalText === 'Save'
                            }">
                                {{ modalText }}
                            </button>
                        </div>
                        <button @click="toggleModal"
                            class="border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
        <div v-if="state.isLoading"
            class="text-center text-gray-500 h-[70vh]  mx-auto flex justify-center items-center">
            <PulseLoader />
        </div>
        <div v-else class="pl-4 w-full">
            <div class="flex items-baseline justify-between">
                <RouterLink to="/instructor-create">
                    <div class="btn bg-blue-500 mb-3 -ml-1">
                    <div class="flex items-center gap-x-2">
                        <i class="pi pi-user-plus"></i>
                        <span>Create</span>
                    </div>
                </div>
                </RouterLink>
                <div class="w-[22vw] mr-8 relative">
                    <input v-model="searchQuery.filterTable"
                        class="w-full p-2.5 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  focus:outline-none"
                        type="text" placeholder="Search..." />
                    <div class="absolute right-4 top-2.5">
                        <i class="pi pi-search"></i>
                    </div>
                </div>
            </div>
            <div class="w-full">
                <!-- md:contents lg:hidden xl:contents -->
                <div class="overflow-x-auto mr-4 h-[63vh] no-scrollbar shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead
                            class="sticky inset-y-0 bg-gray-300 text-center font-semibold tracking-wider uppercase text-sm text-gray-500 whitespace-nowrap">
                            <tr>
                                <th class="w-12 cs-border"></th>
                                <th>ID No.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>address</th>
                                <th>Type</th>
                                <th>action</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-300 text-center text-gray-600 whitespace-nowrap">
                            <tr v-for="(instructor, index) in filteredTableData" :key="state.instructors.id"
                                class="hover:bg-gray-100">
                                <td class="px-4 py-2 text-sm">{{ index + 1 }}</td>
                                <td class="px-4 py-2 text-sm">{{
                                    instructor.instructor_id }}</td>
                                <td class="px-4 py-2 text-sm text-left">{{
                                    instructor.firstname + " " + instructor.lastname }}</td>
                                <td class="px-4 py-2 text-sm text-left">{{ instructor.email }}</td>
                                <td class="px-4 py-2 text-sm">{{ instructor.phone }}</td>
                                <td class="px-4 py-2 text-sm text-left">{{ truncateText(instructor.address, 24) }}</td>
                                <td class="px-4 py-2 text-sm font-bold">
                                    <div :class="{'bg-gray-100 p-2 rounded-full' : true, 'bg-teal-400 text-teal-700': instructor.type === 'Full-Time',
                                        'bg-red-400 text-red-700' : instructor.type === 'Part-Time'}">
                                        {{ instructor.type }}
                                    </div>
                                </td>
                                <td class="px-4 py-2 text-sm flex justify-center">
                                    <div class="flex">
                                        <div
                                            class="bg-blue-500 rounded-full p-1.5 mr-2 flex items-center justify-center">
                                            <button @click="getInstructorData(instructor.id)"
                                                class="inline-block w-6 h-6 flex items-center justify-center">
                                                <i class="pi pi-user-edit text-white"></i>
                                            </button>
                                        </div>
                                        <div class="bg-red-500 rounded-full p-1.5 flex items-center justify-center">
                                            <button @click="deleteStudent(instructor.id)"
                                                class="inline-block w-6 h-6 flex items-center justify-center">
                                                <i class="pi pi-trash text-white"></i>
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
</template>