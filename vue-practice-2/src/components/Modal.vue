<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
    title: {
        type: String,
        default: 'Error',
    },
    modalActive: {
        type: Boolean,
        default: false
    },
    size: {
        type: String,
        default: '45%'
    }
});

const emit = defineEmits(['close-modal']);

const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
        emit('close-modal');
    }
};

</script>
<template>
    <Teleport to="body">
        <Transition name="modal-outer">
            <div v-show="modalActive" @click="handleOverlayClick"
                class="absolute w-full bg-gray-800/60 top-0 left-0 z-50 flex justify-center items-center md:inset-0">
                <Transition name="modal-inner">
                    <div v-if="modalActive" class="p-4" :style="{ width: size }">
                        <div class="relative bg-white rounded-lg shadow ">
                            <div class="flex items-center justify-between p-6 md:p-8 border-b rounded-t">
                                <h3 class="text-2xl font-semibold text-gray-900">
                                    {{ title }}
                                </h3>
                                <button @click="$emit('close-modal')" type="button"
                                    class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                        fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>
                            <!-- here the body of modal-->
                            <slot />
                        </div>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>
<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
    transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
    opacity: 0;
}

.modal-inner-enter-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s
}

.modal-inner-leave-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s
}

.modal-inner-enter-from {
    opacity: 0;
    transform: scale(0.8);
}

.modal-inner-leave-to {
    transform: scale(0.8);
}
</style>