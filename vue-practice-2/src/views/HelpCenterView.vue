<script setup>
</script>
<template>
    <section>
        <div class="container mx-auto flex flex-col w-full h-[80vh] gap-y-[25%] px-10 py-8">
            <div class="flex flex-col w-full h-[50%] items-center text-center gap-y-6">
                <label class="text-sm bg-gray-100 px-10 py-2 rounded-full cursor-pointer hover:bg-gray-200">All Services
                    Customer <i class="text-xs pi pi-arrow-right"></i></label>
                <label class="text-6xl font-bold mb-4">Center Help</label>
                <label class="text-sm  w-[55%]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
                    ipsum in
                    enim
                    facilis, quod
                    expedita repudiandae. Sit fuga, illum alias eos sint odit iure! Doloribus quia culpa vitae
                    aspernatur
                    exercitationem?</label>
                <label class="font-semibold">
                    <span
                        class="pi pi-comments text-gray-50 bg-black px-3 py-2 rounded-full items-center text-center mr-4 cursor-pointer hover:bg-opacity-70">Chat
                        on</span>
                    Request
                    message</label>
            </div>
            <div class="w-full flex gap-x-6 h-[45%] px-10">
                <div
                    class="flex-1 text-xs flex flex-col gap-y-2 p-4 relative border-t-4 border-red-500 border-opacity-40 ease-in-out duration-300 before:absolute before:left-0 before:-top-1 before:h-1 before:w-full before:bg-red-500 before:origin-left before:transform before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300 before:ease-in-out">
                    <i class="pi pi-microchip-ai text-2xl"></i>
                    <label class="text-xl font-bold">User Guide</label>
                    <label>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, doloribus?</label>
                    <div class="flex items-center justify-between font-bold mt-2">
                        <label>read more</label>
                        <i class="pi pi-arrow-right text-xs cursor-pointer hover:bg-gray-200 p-2 rounded-full"></i>
                    </div>
                </div>


                <div
                    class="flex-1 text-xs flex flex-col gap-y-2 border-t-4 p-4 border-yellow-500 border-opacity-40 hover:border-opacity-100 ease-in-out duration-300">
                    <i class="pi pi-question-circle text-2xl"></i>
                    <label class="text-xl font-bold">FAQs</label>
                    <label> Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, doloribus?</label>
                    <div class="flex items-center justify-between font-bold mt-2">
                        <label>read more</label>
                        <i class="pi pi-arrow-right text-xs cursor-pointer hover:bg-gray-200 p-2 rounded-full"></i>
                    </div>
                </div>
                <div
                    class="flex-1 text-xs flex flex-col gap-y-2 border-t-4 p-4 border-green-500 border-opacity-40 hover:border-opacity-100 ease-in-out duration-300">
                    <i class="pi pi-envelope text-2xl"></i>
                    <label class="text-xl font-bold">Contact Us</label>
                    <label> Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, doloribus?</label>
                    <div class="flex items-center justify-between font-bold mt-2">
                        <label>read more</label>
                        <i class="pi pi-arrow-right text-xs cursor-pointer hover:bg-gray-200 p-2 rounded-full"></i>
                    </div>
                </div>
                <div
                    class="flex-1 text-xs flex flex-col gap-y-2 border-t-4 p-4 border-blue-500 border-opacity-40 hover:border-opacity-100 ease-in-out duration-300">
                    <i class="pi pi-comment text-2xl"></i>
                    <label class="text-xl font-bold">Live Chat</label>
                    <label> Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, doloribus?</label>
                    <div class="flex items-center justify-between font-bold mt-2">
                        <label>read more</label>
                        <i class="pi pi-arrow-right text-xs cursor-pointer hover:bg-gray-200 p-2 rounded-full"></i>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>