<template>
    <div
        class="leave-detail_card d-flex flex-fill align-center border rounded-lg my-2"
    >
        <div class="ld-card_logo ma-2 d-flex flex-column align-center">
            <h3>{{ logoDateString.date }} {{ logoDateString.month }}</h3>
            <h1>{{ logoDateString.year }}</h1>
        </div>
        <div class="ld-card-body d-flex flex-column ma-2">
            <h3>Request Message</h3>
            <div class="ld-category d-flex flex-row">
                <span
                    class="border rounded-pill px-2 text-caption text-uppercase"
                    >Unplanned</span
                >
            </div>
            <div class="ld-card-body_description">
                <p>{{ trmimedDescrition }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import moment from "moment";
    import { computed, ref } from "vue";

    const date = moment(new Date()).format("Do MMM YYYY").split(" ");

    let description =
        ref(`Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repudiandae distinctio voluptates velit. Blanditiis
                    assumenda dignissimos ad molestias, adipisci eum veniam
                    ullam accusantium ut! In, pariatur distinctio debitis
                    repellat commodi voluptas necessitatibus a. Voluptates ipsa
                    vitae veniam`);
    const logoDateString = computed(() => {
        return {
            date: `${date[0]}`,
            month: `${date[1]}`,
            year: `${date[2]}`,
        };
    });
    const year = `${date[2]}`;
    const trmimedDescrition = computed(() => {
        return description.value?.slice(0, 50) + "...";
    });
</script>

<style scoped>
    .leave-detail_card {
        background-color: #f0f3fb;
        min-width: 300px;
        height: fit-content;
    }
    .ld-card-body_description {
    }
    .ld-category > span {
        background-color: rgb(255, 240, 220);
        color: orangered;
    }
    .ld-card_logo > h3 {
        width: 70px;
    }
</style>
