<template>
    <div class="home-page">
        <div class="clock" onload="showTime()">{{ todayDate }} {{ timer }}</div>
        <h1 class="welcome-msg">Welcome</h1>
        <div class="greeting-msg">
            <h2>
                {{ greetingMsg }}
            </h2>
            <img :src="`src/assets/images/${greetingImg}`" alt="" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";

const greetingMsg: Ref<string> = ref("");
const greetingImg: Ref<string> = ref("");
const timer: Ref<string> = ref("");
const todayDate: Ref<string> = ref("");
const hours: number = new Date().getHours();

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Aug",
    "Oct",
    "Nov",
    "Dec",
];

if (hours < 12) {
    greetingMsg.value = "Good Morning";
    greetingImg.value = "sun-rise.png";
} else if (hours >= 12 && hours <= 17) {
    greetingMsg.value = "Good Afternoon";
    greetingImg.value = "sun.png";
} else if (hours >= 17 && hours <= 24) {
    greetingMsg.value = "Good Evening";
    greetingImg.value = "sunset.png";
}

function showTime(): void {
    let date: Date = new Date();
    let hours: number | string = date.getHours();
    let minutes: number | string = date.getMinutes();
    let seconds: number | string = date.getSeconds();
    const day: number = date.getDate();
    const month: number = date.getMonth();
    const dayOfWeek: number = date.getDay();
    let session: string = "AM";

    if (hours == 0) {
        hours = 12;
    }

    if (hours >= 12) {
        hours = hours - 12;
        session = "PM";
    }

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    let time = `${hours}:${minutes}:${seconds} ${session}`;
    let today = `${days[dayOfWeek]} ${day} ${months[month]}`;

    timer.value = time;
    todayDate.value = today;
    setTimeout(showTime, 1000);
}

showTime();
</script>

<style scoped>
.home-page {
    height: 50rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
}
.welcome-msg {
    font-size: 200px;
    font-weight: 900;
    top: 15%;
    position: absolute;
    color: #115173a3;
    opacity: 0.8;
}

.greeting-msg {
    display: flex;
}

.greeting-msg h2 {
    color: var(--primary-color);
    font-size: 30px;
    font-weight: 900;
}

.greeting-msg img {
    margin-left: 0.4rem;
}

.clock {
    position: absolute;
    top: 0%;
    right: 5%;
    color: var(--primary-color);
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 1px;
}

@media screen and (max-width: 1280px) {
    .welcome-msg {
        font-size: 10rem;
        top: 20%;
    }
}

@media screen and (max-width: 1072px) {
    .welcome-msg {
        font-size: 7rem;
        top: 30%;
    }
}

@media screen and (max-width: 550px) {
    .welcome-msg {
        font-size: 5rem;
        top: 32%;
    }
}

@media screen and (max-width: 400px) {
    .welcome-msg {
        font-size: 3rem;
        top: 38%;
    }
    .greeting-msg h2 {
        font-size: 24px;
    }

    .greeting-msg img {
        width: 34px;
    }
}
</style>
