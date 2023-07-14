<template>
    <div class="DatePicker-wrapper">
        <VCalendar :attributes="attributes" />
    </div>
</template>

<script setup>
    import { collection, getDocs, query, where } from "firebase/firestore";
    import { storeToRefs } from "pinia";
    import { computed, onMounted, reactive, ref } from "vue";
    import { useFirestore } from "vuefire";
    import { useLeavesStore } from "../stores/leaves";

    const { leavesDates } = storeToRefs(useLeavesStore());
    const userId = ref("8myANlkdZmLQ3qccNAeE");
    const database = useFirestore();

    let attributes = computed(() => {
        console.log(leavesDates.value);
        attributes = reactive([
            {
                highlight: {
                    start: { fillMode: "outline" },
                    base: { fillMode: "light" },
                    end: { fillMode: "outline" },
                },
                dates: leavesDates.value,
            },
        ]);
        console.log(attributes);
        return attributes;
    });
</script>

<style scoped>
    .DatePicker-wrapper {
        min-width: 325px;
        max-width: 375px;
    }
</style>
