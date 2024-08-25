<script setup>
import { ref, computed } from 'vue';


const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

// Initialize the current date
const today = new Date();
const currentMonthIndex = ref(today.getMonth()); // Get the current month index (0-11)
const selectedYear = ref(today.getFullYear()); // Get the current year

const years = Array.from({ length: 20 }, (_, i) => selectedYear.value - 5 + i); // Create a range of years around the current year

const currentMonth = computed({
    get() {
        return months[currentMonthIndex.value];
    },
    set(value) {
        const index = months.indexOf(value);
        if (index !== -1) {
            currentMonthIndex.value = index;
        }
    }
});

const previousMonth = () => {
    if (currentMonthIndex.value > 0) {
        currentMonthIndex.value--;
    } else {
        currentMonthIndex.value = 11; // Move to December of the previous year
        selectedYear.value--;
        updateYears(); // Update the years range
    }
};

const nextMonth = () => {
    if (currentMonthIndex.value < months.length - 1) {
        currentMonthIndex.value++;
    } else {
        currentMonthIndex.value = 0; // Move to January of the next year
        selectedYear.value++;
        updateYears(); // Update the years range
    }
};

const daysInMonth = computed(() => {
    const month = currentMonthIndex.value;
    return new Date(selectedYear.value, month + 1, 0).getDate();
});

const daysInPreviousMonth = computed(() => {
    const month = currentMonthIndex.value;
    return new Date(selectedYear.value, month, 0).getDate();
});

const firstDayOfMonth = computed(() => {
    const month = currentMonthIndex.value;
    return new Date(selectedYear.value, month, 1).getDay(); // Get the day of the week for the 1st day of the month
});

const totalDaysInGrid = 35; // 5 rows * 7 columns

const calendarDays = computed(() => {
    const days = [];
    const totalDays = daysInMonth.value;
    const firstDay = firstDayOfMonth.value;
    const lastDayPreviousMonth = daysInPreviousMonth.value;

    // Fill initial slots with the previous month's days
    for (let i = 0; i < firstDay; i++) {
        days.push({ day: lastDayPreviousMonth - firstDay + 1 + i, isFromPreviousMonth: true, isFirstDay: false });
    }

    // Fill the days of the current month
    for (let i = 1; i <= totalDays; i++) {
        days.push({ day: i, isFromPreviousMonth: false, isFirstDay: i === 1 });
    }

    // Calculate how many more days are needed to fill the grid
    const daysNeeded = totalDaysInGrid - days.length;

    // Fill remaining slots with the next month's days
    for (let i = 1; i <= daysNeeded; i++) {
        days.push({ day: i, isFromPreviousMonth: true, isFirstDay: i === 1 });
    }

    return days;
});

const displayMonth = (isFromNextMonth) => {
    const monthIndex = isFromNextMonth ? (currentMonthIndex.value + 1) % 12 : currentMonthIndex.value;
    return months[monthIndex].substring(0, 3); // Get the first 3 letters of the month
};

// Update years range based on selected year
const updateYears = () => {
    years.splice(0, years.length, ...Array.from({ length: 10 }, (_, i) => selectedYear.value - 5 + i));
};
</script>
<template>
    <section>
        <div class="border-b border-gray-300 px-4 pb-4 flex justify-between items-center">
            <div>
                <i @click="previousMonth"
                    class="pi pi-angle-left text-xl cursor-pointer p-2 rounded-full hover:bg-gray-100"></i>
                <i @click="nextMonth"
                    class="pi pi-angle-right text-xl cursor-pointer p-2 rounded-full hover:bg-gray-100"></i>
                <select class="text-xl font-semibold hover:bg-gray-100 rounded outline-none cursor-pointer" name="Month"
                    v-model="currentMonth">
                    <option v-for="(month, index) in months" :key="index" :value="month">{{ month }}</option>
                </select>
                <select class="text-xl font-semibold ml-4 hover:bg-gray-100 rounded outline-none cursor-pointer"
                    name="Year" v-model="selectedYear">
                    <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                </select>
            </div>
            <div class="mr-4 flex gap-x-4 items-center">
                <i class="pi pi-cog text-xl"></i>
                <button class="text-lg font-semibold border p-2 rounded">Month<i class="pi pi-angle-down"></i></button>
            </div>
        </div>
        <div class="px-10 xl:h-[75vh] md:h-[75vh] flex flex-col">
            <div class="flex text-xs text-gray-500 font-semibold  text-center mt-2">
                <label class="flex-1">SUN</label>
                <label class="flex-1">MON</label>
                <label class="flex-1">TUE</label>
                <label class="flex-1">WED</label>
                <label class="flex-1">THU</label>
                <label class="flex-1">FRI</label>
                <label class="flex-1">SAT</label>
            </div>
            <div class="grid grid-cols-7 text-center flex-1 auto-rows-fr">
                <!-- Dynamically generate days based on the selected month and year -->
                <label v-for="(dayObj, index) in calendarDays" :key="index"
                    :class="['border pt-1 text-xs hover:bg-gray-100 font-semibold', dayObj.isFromPreviousMonth ? 'text-gray-400' : 'text-gray-900']">
                    <!-- Display month abbreviation and the day number 1 for the 1st day of the month and next month's 1st day -->
                    <template v-if="dayObj.isFirstDay">
                        {{ displayMonth(dayObj.isFromPreviousMonth) }} 1
                    </template>
                    <template v-else>
                        {{ dayObj.day }}
                    </template>
                </label>
            </div>
        </div>
    </section>
</template>
