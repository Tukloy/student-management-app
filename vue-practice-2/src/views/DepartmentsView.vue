<style scoped>
.tooltip:hover .tooltip-content {
    opacity: 1;
    transition-delay: 800ms;
}

.tooltip-content {
    pointer-events: none;
    /* Prevents the tooltip from being hovered */
}
</style>
<script setup>
import depWP from '@/assets/image/department/wallpaper.png'
import bad from '@/assets/image/department/bad.png'
import bd from '@/assets/image/department/bd.png'
import cd from '@/assets/image/department/cd.png'
import csd from '@/assets/image/department/csd.png'
import ed from '@/assets/image/department/ed.png'
import engd from '@/assets/image/department/engd.png'
import esd from '@/assets/image/department/esd.png'
import hd from '@/assets/image/department/hd.png'
import matd from '@/assets/image/department/matd.png'
import md from '@/assets/image/department/md.png'
import pd from '@/assets/image/department/pd.png'
import phyd from '@/assets/image/department/phyd.png'
import psyd from '@/assets/image/department/psyd.png'
import sd from '@/assets/image/department/sd.png'
import vad from '@/assets/image/department/vad.png'
import { RouterLink } from 'vue-router'
</script>
<template>
    <section>
        <div class="container mx-auto">
            <div class="w-full px-10 h-[90%] mt-10 relative">
                <img class="w-full h-full object-cover border border-gray-400" :src="depWP">

                <RouterLink to="/department-view/BUS" class="tooltip">
                    <img class="absolute w-[13%] top-[7%] left-[28.89%] cursor-pointer transition-transform duration-300 transform hover:scale-125 hover:drop-shadow-[0_0_15px_rgba(0,0,255,0.7)] "
                        :src="bad">
                    <span
                        class="absolute top-[20%] left-[27%] bg-stone-800 text-gray-50 px-3 py-2 rounded-lg text-sm bg-opacity-80 opacity-0 tooltip-content">Businness
                        Administration Department</span>
                </RouterLink>

                <RouterLink to="/department-view/BIO" class="tooltip">
                    <img class="absolute w-[15%] bottom-[4.28%] left-[20%] cursor-pointer transition-transform duration-300 transform hover:scale-125 hover:drop-shadow-[0_0_15px_rgba(0,0,255,0.7)]"
                        :src="bd">
                    <span
                        class="absolute bottom-[13%] left-[22.5%] bg-stone-800 text-gray-50 px-3 py-2 rounded-lg text-sm bg-opacity-80  opacity-0 tooltip-content">Biology
                        Department</span>
                </RouterLink>

                <RouterLink to="/department-view/CHEM" class="tooltip">
                    <img class="absolute w-[10.5%] bottom-[9.50%] left-[4.80%] cursor-pointer transition-transform duration-300 transform hover:scale-125 hover:drop-shadow-[0_0_15px_rgba(0,0,255,0.7)]"
                        :src="cd">
                    <span
                        class="absolute bottom-[13%] left-[4.5%] bg-stone-800 text-gray-50 px-3 py-2 rounded-lg text-sm bg-opacity-80  opacity-0 tooltip-content">Chemistry
                        Department</span>
                </RouterLink>

                <RouterLink to="/department-view/CS" class="tooltip">
                    <img class="absolute w-[16%] bottom-[0%] right-[8.78%] cursor-pointer transition-transform duration-300 transform hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(0,0,255,0.7)]"
                        :src="csd">
                    <span
                        class="absolute bottom-[9%] right-[10%] bg-stone-800 text-gray-50 px-3 py-2 rounded-lg text-sm bg-opacity-80 opacity-0 tooltip-content">Computer
                        Science
                        Department</span>
                </RouterLink>

                <RouterLink to="/department-view/ECON" class="tooltip">
                    <img class="absolute w-[17%] top-[23.50%] left-[31.10%] cursor-pointer transition-transform duration-300 transform hover:scale-125 hover:drop-shadow-[0_0_15px_rgba(0,0,255,0.7)]"
                        :src="ed">
                    <span
                        class="absolute top-[40%] left-[35%] bg-stone-800 text-gray-50 px-3 py-2 rounded-lg text-sm bg-opacity-80 opacity-0 tooltip-content">Economics
                        Department</span>
                </RouterLink>

                <RouterLink to="/department-view/ENG" class="tooltip">
                    <img class="absolute w-[15.3%] bottom-[29%] right-[16.2%] cursor-pointer transition-transform duration-300 transform hover:scale-125 hover:drop-shadow-[0_0_15px_rgba(0,0,255,0.7)]"
                        :src="engd">
                    <span
                        class="absolute bottom-[37%] right-[19%] bg-stone-800 text-gray-50 px-3 py-2 rounded-lg text-sm bg-opacity-80 opacity-0 tooltip-content">English
                        Department</span>
                </RouterLink>

                <RouterLink to="/department-view/ENV" class="tooltip">
                    <img class="absolute w-[14.5%] top-[9.8%] left-[6.65%] cursor-pointer transition-transform duration-300 transform hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(0,0,255,0.7)]"
                        :src="esd">
                    <span
                        class="absolute top-[26%] left-[6%] bg-stone-800 text-gray-50 px-3 py-2 rounded-lg text-sm bg-opacity-80 opacity-0 tooltip-content">Environmental
                        Science
                        Department</span>
                </RouterLink>

                <RouterLink to="/department-view/HIST" class="tooltip">
                    <img class="absolute w-[13%] bottom-[26.55%] left-[40%] cursor-pointer transition-transform duration-300 transform hover:scale-125 hover:drop-shadow-[0_0_15px_rgba(0,0,255,0.7)]"
                        :src="hd">
                    <span
                        class="absolute bottom-[33%] left-[41.5%] bg-stone-800 text-gray-50 px-3 py-2 rounded-lg text-sm bg-opacity-80 opacity-0 tooltip-content">History
                        Department</span>
                </RouterLink>

                <RouterLink to="/department-view/Math" class="tooltip">
                    <img class="absolute w-[21.5%] -bottom-[5.35%] left-[41%] cursor-pointer transition-transform duration-300 transform hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(0,0,255,0.7)]"
                        :src="matd">
                    <span
                        class="absolute bottom-[10%] left-[47.5%] bg-stone-800 text-gray-50 px-3 py-2 rounded-lg text-sm bg-opacity-80 opacity-0 tooltip-content">Mathematics
                        Department</span>
                </RouterLink>

                <RouterLink to="/department-view/MUS" class="tooltip">
                    <img class="absolute w-[14%] top-[10%] left-[47.5%] cursor-pointer transition-transform duration-300 transform hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(0,0,255,0.7)]"
                        :src="md">
                    <span
                        class="absolute top-[25%] left-[50%] bg-stone-800 text-gray-50 px-3 py-2 rounded-lg text-sm bg-opacity-80 opacity-0 tooltip-content">Music
                        Department</span>
                </RouterLink>

                <RouterLink to="/department-view/PHIL" class="tooltip">
                    <img class="absolute w-[11%] top-[39.90%] left-[6.8%] cursor-pointer transition-transform duration-300 transform hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(0,0,255,0.7)]"
                        :src="pd">
                    <span
                        class="absolute top-[50%] left-[6.5%] bg-stone-800 text-gray-50 px-3 py-2 rounded-lg text-sm bg-opacity-80 opacity-0 tooltip-content">Philosophy
                        Department</span>
                </RouterLink>

                <RouterLink to="/department-view/PHYS" class="tooltip">
                    <img class="absolute w-[18%] bottom-[30.8%] right-[2.8%] cursor-pointer transition-transform duration-300 transform hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(0,0,255,0.7)]"
                        :src="phyd">
                    <span
                        class="absolute bottom-[39%] right-[7.3%] bg-stone-800 text-gray-50 px-3 py-2 rounded-lg text-sm bg-opacity-80 opacity-0 tooltip-content">Physics
                        Department</span>
                </RouterLink>

                <RouterLink to="/department-view/PSYC" class="tooltip">
                    <img class="absolute w-[15%] bottom-[30.6%] left-[20.20%] cursor-pointer transition-transform duration-300 transform hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(0,0,255,0.7)]"
                        :src="psyd">
                    <span
                        class="absolute bottom-[37%] left-[22%] bg-stone-800 text-gray-50 px-3 py-2 rounded-lg text-sm bg-opacity-80 opacity-0 tooltip-content">Psychology
                        Department</span>
                </RouterLink>

                <RouterLink to="/department-view/SOC" class="tooltip">
                    <img class="absolute w-[16%] -top-[0.7%] right-[12.20%] cursor-pointer transition-transform duration-300 transform hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(0,0,255,0.7)]"
                        :src="sd">
                    <span
                        class="absolute top-[18%] right-[15.5%] bg-stone-800 text-gray-50 px-3 py-2 rounded-lg text-sm bg-opacity-80 opacity-0 tooltip-content">Sociology
                        Department</span>
                </RouterLink>

                <RouterLink to="/department-view/ART" class="tooltip">
                    <img class="absolute w-[15%] top-[12.95%] right-[26%] cursor-pointer transition-transform duration-300 transform hover:scale-125 hover:drop-shadow-[0_0_15px_rgba(0,0,255,0.7)]"
                        :src="vad">
                    <span
                        class="absolute top-[31%] right-[28.5%] bg-stone-800 text-gray-50 px-3 py-2 rounded-lg text-sm bg-opacity-80 opacity-0 tooltip-content">Visual
                        Arts
                        Department</span>
                </RouterLink>
            </div>
        </div>
    </section>
</template>