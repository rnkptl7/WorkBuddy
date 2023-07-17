<template>
    <div class="DatePicker-wrapper">
        <VCalendar :attributes="attributes" borderless />
    </div>
</template>

<script setup>
    import { collection, getDocs, query, where } from "firebase/firestore";
    import { storeToRefs } from "pinia";
    import { computed, onMounted, reactive, ref, watch } from "vue";
    import { useFirestore } from "vuefire";
    import { useLeavesStore } from "../stores/leaves";

    const { leavesDates } = storeToRefs(useLeavesStore());
    const userId = ref("8myANlkdZmLQ3qccNAeE");
    const database = useFirestore();

    // Fetching realtime attributes
    let attributes = ref([]);
    watch(useLeavesStore(), () => {
        console.log("==== store updated! ===");
        attributes.value = useLeavesStore().leavesDates.map((item) => {
            const leave = {
                content: {
                    style: {
                        color: item.status === "pending" ? "white" : "white",
                    },
                },
                highlight: item.status === "pending" ? "yellow" : "blue",
                dates: { start: item.start, end: item.end },
            };
            console.log(leave);
            return leave;
        });
    });
</script>

<style>
    .vc-pane {
        width: 400px;
    }
    @media screen and (max-width: 1050px) {
        .vc-pane {
            width: 300px;
        }
    }
</style>
