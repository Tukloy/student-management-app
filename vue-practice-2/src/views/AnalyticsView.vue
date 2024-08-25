<script setup>
import { reactive } from 'vue';
import { Bar, Pie } from 'vue-chartjs';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    Colors,
    ArcElement,
    DoughnutController
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Colors,
    ArcElement,
    DoughnutController
);

const chartData = reactive({
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
        {
            label: 'Students',
            data: [10, 2, 3, 12, 15, 1],
        },
        {
            label: 'Instructor',
            data: [2, 3, 4, 11, 10, 5],
        },
        {
            label: 'People Count',
            data: [2, 3, 12, 7, 6, 5],
        }
    ]
});

const chartOptions = reactive({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
            text: 'Monthly Data Overview',
            font: {
                size: 18
            },
            padding: {
                top: 10,
                bottom: 30
            }
        },
        colors: {
            enabled: true
        }
    }
});

const lastChartData = reactive({
    labels: ['July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
        {
            label: 'New Students',
            data: [5, 7, 8, 3, 6, 9],
            backgroundColor: '#FF6384',
        },
        {
            label: 'New Instructors',
            data: [1, 4, 2, 8, 3, 7],
            backgroundColor: '#36A2EB',
        },
        {
            label: 'Total People Count',
            data: [6, 11, 10, 11, 9, 16],
            backgroundColor: '#FFCE56',
        }
    ]
});

const lastChartOptions = reactive({
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
        title: {
            display: true,
            text: 'Second Half-Year Data Overview',
            font: {
                size: 18
            },
            padding: {
                top: 10,
                bottom: 30
            }
        },
        colors: {
            enabled: true
        }
    }
});

const pieData = reactive({
    labels: ['Student', 'Course', 'Department'],
    datasets: [
        {
            label: 'test',
            data: [10, 2, 3],
        }
    ],
    hoverOffset: 4
});

const pieOptions = reactive({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
            text: 'Testing Pie',
            font: {
                size: 18
            }
        },
        colors: {
            enabled: true
        },
        legend: {
            position: 'right'
        }
    }
});

</script>

<template>
    <section>
        <div class="px-10 flex flex-col gap-y-8">
            <div class="w-full flex justify-between container mx-auto relative">
                <div class="w-[60%] border-4 border-gray-400 p-2 h-[300px]">
                    <Bar :data="chartData" :options="chartOptions" />
                </div>
                <div
                    class="w-[35%] h-[250px] flex items-center justify-center border-4 border-gray-400 px-3 py-4 absolute top-0 right-0">
                    <Pie :data="pieData" :options="pieOptions" />
                </div>
            </div>
            <div class="w-full flex flex-col gap-y-8 container mx-auto relative">
                <div class="w-[48%] flex">
                    <div class="flex flex-1 flex-col py-2 px-3 gap-y-1 border-4">
                        <label class="text-xs font-semibold">New users</label>
                        <label class="text-xl font-bold">1,171</label>
                        <label class="bg-green-100 text-xs font-semibold text-green-500 rounded-md p-1 w-12">38%<i
                                class="pi pi-arrow-up ml-1"></i>
                        </label>
                    </div>
                    <div class="flex flex-1 flex-col py-2 px-3 gap-y-1 border-t-4 border-b-4">
                        <label class="text-xs font-semibold">7-day active users</label>
                        <label class="text-xl font-bold">2,325</label>
                        <label class="bg-green-100 text-xs font-semibold text-green-500 rounded-md p-1 w-12">03%<i
                                class="pi pi-arrow-up ml-1"></i>
                        </label>
                    </div>
                    <div class="flex flex-1 flex-col py-2 px-3 gap-y-1 border-4">
                        <label class="text-xs font-semibold">28-day active user</label>
                        <label class="text-xl font-bold">5,592</label>
                        <label class="bg-red-100 text-xs font-semibold text-red-500 rounded-md p-1 w-12">04%<i
                                class="pi pi-arrow-down ml-1"></i>
                        </label>
                    </div>
                </div>
                <div class="w-[50%]">
                    <div class="flex gap-x-4">
                        <div
                            class="flex flex-col justify-center items-center bg-emerald-600 p-4 bg-opacity-70 text-gray-50 rounded-xl gap-y-3">
                            <label
                                class="text-3xl bg-opacity-40 bg-emerald-200 w-full text-center py-3 rounded-xl font-semibold">43.4M</label>
                            <label class="text-center text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Quo
                                culpa officiis
                                ea rem!
                                Est non officia, odit recusandae libero in.</label>
                        </div>
                        <div
                            class="flex flex-col justify-center items-center bg-emerald-600 p-4 bg-opacity-70 text-gray-50 rounded-xl gap-y-3">
                            <label
                                class="text-3xl bg-opacity-40 bg-emerald-200 w-full text-center py-3 rounded-xl font-semibold">43.4M</label>
                            <label class="text-center text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Quo
                                culpa officiis
                                ea rem!
                                Est non officia, odit recusandae libero in.</label>
                        </div>
                        <div
                            class="flex flex-col justify-center items-center bg-emerald-600 p-4 bg-opacity-70 text-gray-50 rounded-xl gap-y-3">
                            <label
                                class="text-3xl bg-opacity-40 bg-emerald-200 w-full text-center py-3 rounded-xl font-semibold">43.4M</label>
                            <label class="text-center text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Quo
                                culpa officiis
                                ea rem!
                                Est non officia, odit recusandae libero in.</label>
                        </div>
                    </div>
                </div>
                <div class="absolute right-0 top-0 bottom-0 w-[46%] bg-gray-100">
                    <!-- Insert Bar chart here with different data -->
                    <Bar :data="lastChartData" :options="lastChartOptions" />
                </div>
            </div>
        </div>
    </section>
</template>
