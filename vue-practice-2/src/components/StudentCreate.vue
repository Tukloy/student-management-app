<style scoped>
input {
    border: 1px solid rgb(185, 185, 185);
}

.noHover {
    pointer-events: none;
}
</style>
<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { reactive, onMounted, computed } from 'vue';
import { useToast } from 'vue-toastification';
import axios from 'axios';

const router = useRouter();
const toast = useToast();
const form = reactive({
    id: '',
    student_id: '',
    firstname: '',
    lastname: '',
    gender: 'Female',
    course: '',
    phone: null,
    address: {
        house_no: '',
        street: '',
        district: '',
        city: '',
        province: '',
        zip_code: null
    },
    email: '',
    emergency_contact: {
        name: '',
        phone: null
    },
    status: 'Active',

});
const state = ({
    students: {}
})
const getStudentId = async () => {
    try {
        const response = await axios.get('/api/students');
        state.students = response.data;

        // Compute the last ID immediately after setting the state
        const lastId = Math.max(...state.students.map(student => parseInt(student.id, 10))) + 1;
        form.id = lastId;
        form.student_id = `S0${lastId}`;

    } catch (error) {
        console.error('Error fetching Student Id', error);
    }
};
const handleSubmit = async () => {
    const newStudent = {
        id: String(form.id),
        student_id: form.student_id,
        firstname: form.firstname,
        lastname: form.lastname,
        gender: form.gender,
        phone: form.phone,
        email: form.email,
        address:
            form.address.house_no + " " + form.address.street + " " +
            form.address.district + " " + form.address.city + " " +
            form.address.province + " " + form.address.zip_code,
        emergency_contact: form.emergency_contact.name + " " + form.emergency_contact.phone,
        status: form.status
    }
    try {
        await axios.post('/api/students', newStudent);
        router.push('/students-view');
        toast.success('Student Added Successfully');
    } catch (error) {
        console.error('Error Adding Student', error);
        toast.error('Student Was Not Added');
    }
}
const isNonEmptyString = (value) => {
    return typeof value === 'string' && value.trim().length > 0;
};

const isFormValid = computed(() => {
    let stringPhone = String(form.phone);
    stringPhone = stringPhone === 'null' ? stringPhone = '' : stringPhone;

    let stringAddressZipCode = String(form.address.zip_code);
    stringAddressZipCode === 'null' ? stringAddressZipCode = '' : stringAddressZipCode;

    let stringContactPhone = String(form.emergency_contact.phone);
    stringContactPhone = stringContactPhone === 'null' ? stringContactPhone = '' : stringContactPhone

    const result = (isNonEmptyString(form.firstname) &&
        isNonEmptyString(form.lastname) &&
        isNonEmptyString(form.course) &&
        isNonEmptyString(form.address.house_no) &&
        isNonEmptyString(form.address.street) &&
        isNonEmptyString(form.address.district) &&
        isNonEmptyString(form.address.city) &&
        isNonEmptyString(form.address.province) &&
        isNonEmptyString(stringAddressZipCode)) &&
        isNonEmptyString(stringPhone) &&
        isNonEmptyString(form.email) &&
        isNonEmptyString(form.emergency_contact.name) &&
        isNonEmptyString(stringContactPhone);
    return result;

});
onMounted(() => {
    getStudentId();
})
</script>
<template>
    <section>
        <div class="flex">
            <RouterLink to="/students-view"
                class="flex flex-row items-center text-sm font-medium text-gray-900 bg-gray-300 p-2 rounded-lg hover:bg-gray-700 hover:text-gray-50 transition ease-in-out">
                <i class="pi pi-arrow-circle-left pr-2"></i>
                <div>Back</div>
            </RouterLink>
        </div>
        <div class="lg:w-[70%] md:w-[80%] xs:w-[86%] mx-auto flex bg-gray-100 rounded-md">
            <div class="w-full mx-10 my-7">
                <form @submit.prevent="handleSubmit">
                    <label for="" class="block mb-2 text-sm font-medium text-gray-900 mb-7">Please complete the
                        form below to apply.</label>
                    <div class="flex mb-3 gap-x-4">
                        <div class="flex-2">
                            <label class="block mb-2 text-sm font-medium text-gray-900" for="">Student ID:</label>
                            <input v-model="form.student_id"
                                class="border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5 bg-gray-50"
                                readonly type="text">
                        </div>
                        <div class="flex-1">
                            <label class="block mb-2 text-sm font-medium text-gray-900" for="">Program:</label>
                            <select id="programs" v-model="form.course"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                <option selected disabled>Choose a program</option>
                                <option value="BSND">Bachelor of Science in Nutrition and Dietetics</option>
                                <option value="BSGEO">Bachelor of Science in Geology</option>
                                <option value="BSMB">Bachelor of Science in Marine Biology</option>
                                <option value="BSARCH">Bachelor of Science in Architecture</option>
                                <option value="BSPHAR">Bachelor of Science in Pharmacy</option>
                                <option value="BSMT">Bachelor of Science in Medical Technology</option>
                                <option value="BSNUR">Bachelor of Science in Nursing</option>
                                <option value="BSMKT">Bachelor of Science in Marketing</option>
                                <option value="BSHM">Bachelor of Science in Hospitality Management</option>
                                <option value="BSACC">Bachelor of Science in Accountancy</option>
                                <option value="BSBA">Bachelor of Science in Business Administration</option>
                                <option value="BSPSY">Bachelor of Science in Psychology</option>
                                <option value="BSES">Bachelor of Science in Environmental Science</option>
                                <option value="BSEE">Bachelor of Science in Engineering</option>
                                <option value="BSCHEM">Bachelor of Science in Chemistry</option>
                                <option value="BSMATH">Bachelor of Science in Mathematics</option>
                                <option value="BSPHY">Bachelor of Science in Physics</option>
                                <option value="BSBIO">Bachelor of Science in Biology</option>
                                <option value="BSIT">Bachelor of Science in Information Technology</option>
                                <option value="BSCS">Bachelor of Science in Computer Science</option>
                            </select>
                        </div>
                    </div>
                    <div class="flex flex-row gap-x-4 mb-3">
                        <div class="flex-1">
                            <label class="block mb-2 text-sm font-medium text-gray-900" for="">Firstname:</label>
                            <input v-model="form.firstname"
                                class="border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5"
                                placeholder="Firstname" type="text">
                        </div>
                        <div class="flex-1">
                            <label class="block mb-2 text-sm font-medium text-gray-900" for="">Lastname:</label>
                            <input v-model="form.lastname"
                                class="border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5"
                                placeholder="Lastname" type="text">
                        </div>
                        <div class="flex-2">
                            <label class="block mb-2 text-sm font-medium text-gray-900" for="">Gender:</label>
                            <div class="flex items-center mb-2">
                                <input v-model="form.gender" id="default-radio-1" type="radio" value="Male"
                                    name="default-radio"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="default-radio-1" class="ms-2 text-xs font-medium text-gray-900">Male</label>
                            </div>
                            <div class="flex items-center">
                                <input v-model="form.gender" checked id="default-radio-2" type="radio" value="Female"
                                    name="default-radio"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="default-radio-2"
                                    class="ms-2 text-xs font-medium text-gray-900">Female</label>
                            </div>
                        </div>
                    </div>
                    <div class="flex mb-3 gap-x-4">
                        <div class="flex-2">
                            <label class="block mb-2 text-sm font-medium text-gray-900" for="">House no:</label>
                            <input v-model="form.address.house_no"
                                class="border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5"
                                placeholder="123.eg" type="text">
                        </div>
                        <div class="flex-1">
                            <label class="block mb-2 text-sm font-medium text-gray-900" for="">Street:</label>
                            <input v-model="form.address.street"
                                class="border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5"
                                placeholder="ect. st." type="text">
                        </div>
                        <div class="flex-1">
                            <label class="block mb-2 text-sm font-medium text-gray-900" for="">District:</label>
                            <input v-model="form.address.district"
                                class="border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5"
                                placeholder="barangay." type="text">
                        </div>
                    </div>
                    <div class="flex mb-3 gap-x-3">
                        <div class="flex-1">
                            <label class="block mb-2 text-sm font-medium text-gray-900" for="">City:</label>
                            <input v-model="form.address.city"
                                class="border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5"
                                placeholder="City" type="text">
                        </div>
                        <div class="flex-1">
                            <label class="block mb-2 text-sm font-medium text-gray-900" for="">Province:</label>
                            <input v-model="form.address.province"
                                class="border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5"
                                placeholder="Province" type="text">
                        </div>
                        <div class="flex-3">
                            <label class="block mb-2 text-sm font-medium text-gray-900" for="">Zip Code:</label>
                            <input v-model.number="form.address.zip_code"
                                class="border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5"
                                placeholder="ex:(4000)" type="number">
                        </div>
                    </div>
                    <div class="flex flex-row gap-x-4 mb-3">
                        <div class="">
                            <label class="block mb-2 text-sm font-medium text-gray-900" for="">Phone:</label>
                            <input v-model.number="form.phone"
                                class="border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5"
                                placeholder="09*********" type="number">
                        </div>
                        <div class="flex-1">
                            <label class="block mb-2 text-sm font-medium text-gray-900" for="">Email:</label>
                            <input v-model="form.email"
                                class="border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5"
                                placeholder="@email.com" type="email">
                        </div>
                    </div>
                    <div class="flex flex-row border-t-2 border-solid border-gray-300 mt-2 gap-x-4 mb-3">
                        <div class="flex-1 mt-2">
                            <label class="block mb-2 text-sm font-medium text-gray-900" for="">Emergency
                                Contact:</label>
                            <input v-model="form.emergency_contact.name"
                                class="border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5"
                                placeholder="Full Name" type="text">
                        </div>
                        <div class="flex-2 mt-2">
                            <label class="block mb-2 text-sm font-medium text-gray-900" for="">Phone No.</label>
                            <input v-model.number="form.emergency_contact.phone"
                                class="border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500  focus:outline-none block w-full p-2.5"
                                placeholder="09123456789" type="number">
                        </div>
                    </div>
                    <div class="flex flex-row-reverse">
                        <div>
                            <button :class="{
                                'btn': true,
                                'pointer-events-none bg-blue-300': !isFormValid,
                                'bg-blue-700 cursor-pointer': isFormValid
                            }" :disabled="!isFormValid">
                                <i class="pi pi-save"></i>
                                Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>
