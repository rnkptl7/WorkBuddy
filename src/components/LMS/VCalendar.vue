<template>
    <div class="DatePicker-wrapper my-2">
        <VCalendar :attributes="attributes" borderless />
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from "pinia";
    import { computed, onMounted, reactive, ref, watch } from "vue";
    import { useFirestore } from "vuefire";
    import { useLeavesStore } from "../../stores/leaves";

    const { leavesDates } = storeToRefs(useLeavesStore());
    const userId = ref("8myANlkdZmLQ3qccNAeE");
    const database = useFirestore();

    // Fetching realtime attributes
    let calendarColors = {
        pending: { fontColor: "black", fill: "yellow" },
        Approved: { fontColor: "white", fill: "blue" },
        rejected: { fontColor: "white", fill: "gray" },
    };

    let attributes = ref([]);
    watch(useLeavesStore(), () => {
        attributes.value = useLeavesStore().leavesDates.map((item) => {
            const leave = {
                content: {
                    style: {
                        color: calendarColors[item.status].fontColor,
                    },
                },
                highlight: calendarColors[item.status].fill,
                dates: { start: item.start, end: item.end },
            };
            return leave;
        });
    });
</script>

<style>
    .vc-pane {
        width: 400px;
    }
    .vc-pane span {
        color: var(--primary-color);
    }
    @media screen and (max-width: 1050px) {
        .vc-pane {
            width: 300px;
        }
    }
</style>
