<style scoped>
.dropdown-content {
    display: none;
}

.dropdown-content.show {
    display: block;
}
</style>
<script setup>
import { defineProps, ref, onMounted, onBeforeUnmount } from "vue";
import { RouterLink } from "vue-router";

defineProps({
    showTitle: {
        type: String,
        default: 'Error',
    }
});
const isDropdownVisible = ref(false);
const dropdownRef = ref(null);

const toggleDropdown = () => {
    isDropdownVisible.value = !isDropdownVisible.value;
};

const closeDropdown = () => {
    isDropdownVisible.value = false;
};

const handleClickOutside = (event) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        closeDropdown();
    }
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>
<template>
    <div class="ml-64 mb-5 bg-gray-100 flex justify-between items-center p-5 sticky top-0 z-50">
        <div class="text-gray-700 text-2xl font-bold">
            {{ showTitle }}
        </div>
        <div class="flex gap-x-3 mr-3">
            <div
                class="bg-gray-500 h-8 w-8 text-white rounded-full flex items-center justify-center cursor-pointer relative">
                <span
                    class="absolute -right-1.5 -top-1 bg-red-600 h-4 w-4 text-xs flex items-center justify-center rounded-full">1</span>
                <i class="pi pi-bell"></i>
            </div>
            <div class="bg-gray-500 h-8 w-8 text-white rounded-full flex items-center justify-center cursor-pointer relative"
                ref="dropdownRef">
                <!--Dropdown Profile-->
                <div
                    :class="['dropdown-content transition ease-in-out duration-300 absolute right-0 top-9 bg-gray-50 bg-opacity-100 px-2 py-2 rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]', { 'show': isDropdownVisible }]">
                    <div class="flex flex-col gap-y-2 text-gray-900 text-sm transition duration-150 ease-in">
                        <RouterLink to="/profile-view" @click="toggleDropdown"
                            class="flex flex-row gap-x-2 items-center hover:bg-gray-300 px-1 py-1 rounded-md">
                            <div class="h-6 w-6 bg-gray-200 rounded-full flex items-center justify-center">
                                <i class="pi pi-user text-black"></i>
                            </div>
                            <div>Profile</div>
                        </RouterLink>
                        <RouterLink to="/help-center-view" @click="toggleDropdown" class="flex flex-row gap-x-2 items-center hover:bg-gray-300 px-1 py-1 rounded-md">
                            <div class="h-6 w-6 bg-gray-200 rounded-full flex items-center justify-center">
                                <i class="pi pi-cog text-black"></i>
                            </div>
                            <div class="whitespace-nowrap">Help & Support</div>
                        </RouterLink>
                        <a href="" class="flex flex-row gap-x-2 items-center hover:bg-gray-300 px-1 py-1 rounded-md">
                            <div class="h-6 w-6 bg-gray-200 rounded-full flex items-center justify-center">
                                <i class="pi pi-sign-out text-black"></i>
                            </div>
                            <div>Log out</div>
                        </a>
                    </div>
                </div>
                <!-- <i class="pi pi-user"></i> -->
                <button @click="toggleDropdown">
                    <img class="rounded-full"
                        src="https://scontent.fmnl9-1.fna.fbcdn.net/v/t39.30808-6/317735488_6293198287376054_8420692245888528439_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEEWe8bHY0sDfUQ2rjglTidkzZKJLUiCTKTNkoktSIJMjUpQB_zamhLMDNeYwowQNvcYqLdMpy4k7_jAB8D6fH-&_nc_ohc=T22UE3OsaDsQ7kNvgF90sFj&_nc_ht=scontent.fmnl9-1.fna&oh=00_AYCh5ZQZgkr5HziIaKnq5BXCHudd8_U450sFhx3qu7IcQg&oe=66B9451D"
                        alt="">
                </button>
            </div>
        </div>
    </div>
</template>