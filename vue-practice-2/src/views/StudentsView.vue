<style>
th {
    padding: 10px;
}
</style>
<script setup>
import { reactive, onMounted, ref, computed } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { useToast } from 'vue-toastification';
import Modal from '@/components/Modal.vue';
import { RouterLink, useRouter } from 'vue-router';
import axios from 'axios';

const toast = useToast();
const router = useRouter();
const searchQuery = reactive({
    filterTable: '',
    filterDrop: ''
});

const isNonEmptyString = (value) => {
    return typeof value === 'string' && value.trim().length > 0;
};

const filteredTableData = computed(() => {
    if (!isNonEmptyString(searchQuery.filterTable || searchQuery.filterDrop)) {
        return state.students;
    }
    const query = searchQuery.filterTable.toLowerCase();
    const query2 = searchQuery.filterDrop.toLowerCase();
    console.log(query2)
    return state.students.filter(student =>
        (student.firstname && student.firstname.toLowerCase().includes(query)) ||
        (student.lastname && student.lastname.toLowerCase().includes(query)) ||
        (student.student_id && student.student_id.toLowerCase().includes(query)) ||
        (student.email && student.email.toLowerCase().includes(query)) ||
        (student.phone && String(student.phone).toLowerCase().includes(query)) ||
        (student.address && student.address.toLowerCase().includes(query)) ||
        (student.status && student.status.toLowerCase().includes(query))
    );
});
const state = reactive(
    {
        students: {},
        student: {},
        isLoading: true
    }
);
const form = reactive({
    id: '',
    student_id: "",
    firstname: "",
    lastname: "",
    gender: "Male",
    phone: null,
    address: "",
    email: "",
    emergency_contact: "",
    status: "Active"
});
const getStudentsData = async () => {
    try {
        const response = await axios.get('/api/students');
        state.students = response.data;
    } catch (error) {
        console.log('Error fetching students', error);
    } finally {
        state.isLoading = false;
    }
}
const getStudentData = async (studentId) => {
    toggleModal();
    try {
        const response = await axios.get(`/api/students/${studentId}`);
        state.student = response.data;
        form.student_id = state.student.student_id;
        form.firstname = state.student.firstname;
        form.lastname = state.student.lastname;
        form.gender = state.student.gender;
        form.phone = Number(state.student.phone);
        form.address = state.student.address;
        form.email = state.student.email;
        form.emergency_contact = state.student.emergency_contact;
        form.status = state.student.status;
    } catch (error) {
        console.log('Error fetching student', error);
        toast.error('Student Not Found')
    } finally {
        state.isLoading = false;
    }
}
const deleteStudent = async (studentId) => {
    try {
        const confirm = window.confirm('Are you sure you want to delete?')
        if (confirm) {
            await axios.delete(`/api/students/${studentId}`);
            getStudentsData();
            toast.success('Student Deleted Sucessfully');
            router.push('/students-view');
        }
    } catch (error) {
        console.error('Error deleting Student', error)
        toast.error('Student Not Deleted')
    }
}
const handleSubmit = async () => {
    const formPhone = String(form.phone);
    const updateStudent = {
        student_id: form.student_id,
        firstname: form.firstname,
        lastname: form.lastname,
        gender: form.gender,
        phone: formPhone,
        address: form.address,
        email: form.email,
        emergency_contact: form.emergency_contact,
        status: form.status
    }
    if (modalText.value === 'Save') {
        try {
            const response = await axios.put(`/api/students/${state.student.id}`, updateStudent);
            getStudentsData();
            router.push('/student-view');
            toast.success('Student Updated Successfully')
        } catch (error) {
            console.error('Error Updating Student', error)
        }
        toggleEditMode();
        toggleModal();
    } else {
        toggleEditMode();
    }
}
onMounted(() => {
    getStudentsData();
});

//MODAL
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
    router.push('/students-view');
}
</script>
<template>
    <Modal :modalActive="modalActive" @close-modal="toggleModal" title="Student Information">
        <div class="p-5 md:p-6 !scroll-smooth">
            <form class="space-y-4 flex flex-col" @submit.prevent="handleSubmit">
                <div class="flex flex-row gap-x-4">
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900">Student ID:</label>
                        <input v-model="form.student_id" type="text" :readonly="isReadonly" :class="{
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
                        <label class="block mb-2 text-sm font-medium text-gray-900">Emergency Contact:</label>
                        <input v-model="form.emergency_contact" type="text" :readonly="isReadonly" :class="{
                            'border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5': true, 'bg-gray-50  text-gray-900': isReadonly === false,
                            'bg-gray-300 text-gray-50': isReadonly === true
                        }" required />
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900">Status:</label>
                        <select v-model="form.status" name="gender" id="gender" :disabled="isReadonly" :class="{
                            'border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5': true, 'bg-gray-50  text-gray-900': isReadonly === false,
                            'bg-gray-300 text-gray-50': isReadonly === true
                        }">
                            <option value="Active">Active</option>
                            <option vlaue="Inactive">Inactive</option>
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
    <section>
        <div class="flex justify-between items-baseline mx-auto">
            <div>
                <RouterLink to="/student-create">
                    <div class="btn mb-3 ml-3 bg-blue-700">
                        Create Student
                    </div>
                </RouterLink>
            </div>
            <div class="w-[22vw] mr-8 relative flex gap-x-4">
                <div class="w-36">
                    <select v-model="searchQuery.filterDrop"
                        class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5">
                        <option selected>All</option>
                        <option value="Active">Active</option>
                        <option vlaue="Inactive">Inactive</option>
                    </select>
                </div>
                <input
                    class="w-full p-2.5 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  focus:outline-none block"
                    type="text" v-model="searchQuery.filterTable" placeholder="Search..." />
                <div class="absolute right-4 top-2.5">
                    <i class="pi pi-search"></i>
                </div>
            </div>
        </div>
        <!-- Show loading spinner while loading-->
        <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
            <PulseLoader />
        </div>
        <div v-else class="container mx-auto px-4">
            <div class="overflow-y-auto h-[63vh] no-scrollbar">
                <table class="min-w-full bg-white">
                    <thead class="sticky inset-y-0 z-10 bg-inherit text-center">
                        <tr
                            class="bg-gradient-to-b from-gray-600 to-gray-400 text-stone-50 text-center text-sm uppercase font-semibold">
                            <th class="w-12 cs-border"></th>
                            <th class="whitespace-nowrap overflow-hidden text-ellipsis">Student ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(student, index) in filteredTableData" :key="student.id" class="border-b">
                            <td class="py-2 px-4">{{ index + 1 }}</td>
                            <td class="py-2 px-4 text-center">{{ student.student_id }}</td>
                            <td class="py-2 px-4">{{ student.firstname + " " + student.lastname }}</td>
                            <td class="py-2 px-4">{{ student.email }}</td>
                            <td class="py-2 px-4">{{ student.phone }}</td>
                            <td class="py-2 px-4">{{ student.address }}</td>
                            <td class='py-1 px-1 text-center'>
                                <div :class="{
                                    'text-center text-gray-700 rounded-full py-2 my-2': true,
                                    'text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2': student.status === 'Active',
                                    'text-white bg-gradient-to-r from-red-300 via-red-400 to-red-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2': student.status === 'Inactive'
                                }">
                                    {{ student.status }}
                                </div>
                            </td>
                            <td class="py-2 px-4 w-4">
                                <div class="flex">
                                    <div class="bg-blue-500 rounded-full p-1.5 mr-2 flex items-center justify-center">
                                        <button @click="getStudentData(student.id)"
                                            class="inline-block w-6 h-6 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                fill="currentColor" class="w-4 h-4 text-white">
                                                <path
                                                    d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div class="bg-red-500 rounded-full p-1.5 flex items-center justify-center">
                                        <button @click="deleteStudent(student.id)"
                                            class="inline-block w-6 h-6 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                fill="currentColor" class="w-4 h-4 text-white">
                                                <path fill-rule="evenodd"
                                                    d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>