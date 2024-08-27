<script setup>
import { ref, reactive, defineEmits, onMounted } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

const router = useRouter()
const toast = useToast()
const emit = defineEmits(['login-status']);
const state = reactive({
    users: {},
})
const formLogin = reactive({
    username: '',
    password: '',
})
const formSignup = reactive({
    id: '',
    email: '',
    username: '',
    password: '',
    repassword: ''
})
const view = ref('login')
const toggleLogin = (viewName) => {
    view.value = viewName || (view.value === 'login' ? 'signup' : 'login');
    showPassword.icon = 'eye-slash'
    showPassword.type = 'password'
}
const handleSubmitLogin = async () => {
    try {
        const response = await axios.get('/api/users');
        state.users = response.data

        let loginSuccess = false;

        state.users.forEach(user => {
            if (
                (user.username === formLogin.username || user.email === formLogin.username) &&
                user.password === formLogin.password
            ) {
                loginSuccess = true;
                toast.info(`Hi ${user.username} Welcome Back!`)
                router.push('/')
            }
        });

        if (!loginSuccess) {
            formLogin.username = ''
            formLogin.password = ''
            toast.error('Wrong Username/Password')
        }

        emit('login-status', loginSuccess);
    } catch (error) {
        console.log('Error Logging in', error)
    }
}
const getUserId = async () => {
    try {
        const response = await axios.get('/api/users');
        state.users = response.data;

        // Compute the last ID immediately after setting the state
        const lastId = Math.max(...state.users.map(user => parseInt(user.id, 10))) + 1;
        formSignup.id = lastId;
    } catch (error) {
        console.error('Error fetching user Id', error);
    }
};
const handleSubmitSignup = async () => {
    const newUser = {
        id: formSignup.id,
        username: formSignup.username,
        password: formSignup.password,
        email: formSignup.email
    }
    try {
        await axios.post('/api/users', newUser)
        toast.success('User Successfully Created!')
        toggleLogin('login')
    } catch (error) {
        console.error('Error Submitting New user', error)
        toast.error('User was not created!')
    }
}
const showPassword = reactive({
    icon: 'eye-slash',
    type: 'password',
    valid: false
})
const toggleShowPassword = () => {
    showPassword.icon = showPassword.icon === 'eye-slash' ? 'eye' : 'eye-slash';
    showPassword.type = showPassword.type === 'password' ? 'text' : 'password'
}
const checkSamePassword = () => {
    if (formSignup.password === formSignup.repassword) {
        showPassword.valid = true
    } else {
        showPassword.valid = false
    }
}
const formSignupValidation = () => {
    if (formSignup.email !== '' && formSignup.username !== '' && showPassword.valid) {
        return false
    } else {
        return true
    }
}
onMounted(() => {
    getUserId();
    checkSamePassword();
})
</script>
<template>
    <div
        class="flex flex-col justify-center items-center h-[100vh] bg-cover bg-center bg-[url('@/assets/image/wallpaper.jpg')]">
        <form v-if="view === 'login'" @submit.prevent="handleSubmitLogin"
            class="flex flex-col items-center 2xl:w-[20%] xl:w-[25%] lg:w-[35%] md:w-[40%] sm:w-[50%] gap-y-4 bg-white py-6 px-3 rounded-lg shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] bg-opacity-60 backdrop-blur-lg">
            <label class="text-3xl font-semibold mb-4">Login</label>
            <div class="w-full relative">
                <i class="pi pi-user text-blue-600 absolute left-3 top-3 text-sm"></i>
                <input v-model="formLogin.username"
                    class="border w-full text-sm py-2 px-8 outline-none rounded-md focus:border-blue-200" type="text"
                    autocomplete="username email" placeholder="Username or Email">
            </div>
            <div class="w-full relative">
                <i class="pi pi-lock text-blue-600 absolute left-3 top-3 text-sm"></i>
                <input v-model="formLogin.password"
                    class="border w-full text-sm py-2 px-8 outline-none rounded-md focus:border-blue-200"
                    :type="showPassword.type" autocomplete="current-password" placeholder="Enter your Password">
                <button type="button" @click="toggleShowPassword">
                    <i :class="['pi absolute right-4 top-3 te text-gray-500', `pi-${showPassword.icon}`]"></i>
                </button>
            </div>
            <div class="flex justify-between w-full text-sm text-gray-500">
                <div class="flex gap-x-2">
                    <input class="border-2" type="checkbox">
                    <label>Remember me</label>
                </div>
                <button type="button" @click="toggleLogin('forgot-password')" class="text-blue-500 font-bold">Forgot
                    Password?</button>
            </div>
            <button type="submit"
                class="w-full bg-blue-600 text-white text-md rounded-xl py-1 hover:bg-blue-500">Login</button>
            <label class="text-sm text-gray-600">Don't have an account? <button type="button"
                    @click="toggleLogin('signup')" class="text-blue-500 font-semibold" href="">Sign
                    up</button></label>
            <div class="flex items-center w-full">
                <div class="flex-grow border-t border-gray-300"></div>
                <span class="mx-4 text-gray-500 text-sm">or connect with</span>
                <div class="flex-grow border-t border-gray-300"></div>
            </div>
            <div class="flex gap-x-4 text-2xl">
                <a href="https:www.facebook.com"><i class="pi pi-facebook text-blue-500"></i></a>
                <a href="https:www.google.com"><i class="pi pi-google text-blue-"></i></a>
                <a href="https:www.github.com"><i class="pi pi-github text-gray-500"></i></a>
            </div>
        </form>
        <form v-else-if="view === 'signup'" @submit.prevent="handleSubmitSignup"
            class="flex flex-col items-center 2xl:w-[20%] xl:w-[25%] lg:w-[35%] md:w-[40%] sm:w-[50%] gap-y-4 bg-white py-6 px-3 rounded-lg shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] bg-opacity-60 backdrop-blur-lg">
            <label class="text-3xl font-semibold">Sign up</label>
            <div class="text-sm">
                <label class="mr-1">Already a have an account?</label>
                <button @click="toggleLogin('login')" class="text-blue-600 font-semibold">Log In</button>
            </div>
            <div class="w-full relative">
                <i class="pi pi-envelope text-blue-600 absolute left-3 top-3 text-sm"></i>
                <input v-model="formSignup.email"
                    class="border w-full text-sm py-2 px-8 outline-none rounded-md focus:border-blue-200" type="email"
                    autocomplete="email" placeholder="Enter your email">
            </div>
            <div class="w-full relative">
                <i class="pi pi-user text-blue-600 absolute left-3 top-3 text-sm"></i>
                <input v-model="formSignup.username"
                    class="border w-full text-sm py-2 px-8 outline-none rounded-md focus:border-blue-200" type="text"
                    autocomplete="username" placeholder="Enter your username">
            </div>
            <div class="w-full relative">
                <i class="pi pi-lock text-blue-600 absolute left-3 top-3 text-sm"></i>
                <input v-model="formSignup.password" @input="checkSamePassword"
                    :class="['border w-full text-sm py-2 px-8 outline-none rounded-md focus:border-blue-200', showPassword.valid === false ? 'outline-red-600' : '']"
                    :type="showPassword.type" autocomplete="current-password" placeholder="Enter your Password">
                <button type="button" @click="toggleShowPassword">
                    <i :class="['pi absolute right-4 top-3 te text-gray-500', `pi-${showPassword.icon}`]"></i>
                </button>
            </div>
            <div class="w-full relative">
                <i class="pi pi-lock text-blue-600 absolute left-3 top-3 text-sm"></i>
                <input v-model="formSignup.repassword" @input="checkSamePassword"
                    :class="['border w-full text-sm py-2 px-8 outline-none rounded-md focus:border-blue-200', showPassword.valid === false ? 'outline-red-600' : '']"
                    :type="showPassword.type" autocomplete="current-password" placeholder="Re-enter your Password">
                <button type="button" @click="toggleShowPassword">
                    <i :class="['pi absolute right-4 top-3 te text-gray-500', `pi-${showPassword.icon}`]"></i>
                </button>
            </div>
            <button :disabled="formSignupValidation()" type="submit"
                :class="['w-full  text-white text-md rounded-xl py-1', formSignupValidation() === false ? 'hover:bg-blue-500 bg-blue-600' : 'bg-blue-400']">Sign
                up</button>
            <div class="flex items-center w-full">
                <div class="flex-grow border-t border-gray-300"></div>
                <span class="mx-4 text-gray-500 text-sm">or sign up with</span>
                <div class="flex-grow border-t border-gray-300"></div>
            </div>
            <div class="flex gap-x-4 text-2xl">
                <a href="https:www.facebook.com"><i class="pi pi-facebook text-blue-500"></i></a>
                <a href="https:www.google.com"><i class="pi pi-google text-blue-"></i></a>
            </div>
        </form>
        <div v-else-if="view === 'forgot-password'"
            class="flex flex-col items-center 2xl:w-[20%] xl:w-[25%] lg:w-[35%] md:w-[40%] sm:w-[50%] gap-y-4 bg-white py-6 px-3 rounded-lg shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] bg-opacity-60 backdrop-blur-lg">
            <label>This will send a message to your email</label>
            <div class="w-full relative">
                <i class="pi pi-envelope text-blue-600 absolute left-3 top-3 text-sm"></i>
                <input class="border w-full text-sm py-2 px-8 outline-none rounded-md focus:border-blue-200"
                    type="email" autocomplete="current-email" placeholder="Enter email">
                <i class="pi pi-arrow-right absolute right-4 top-3 te text-gray-500"></i>
            </div>
            <div>
                <button @click="toggleLogin('login')"
                    class="bg-red-600 text-white py-1 px-3 text-sm rounded hover:bg-red-700">Cancel</button>
            </div>
        </div>
    </div>
</template>
