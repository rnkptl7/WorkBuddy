<template>
    <div class="DatePicker-wrapper">
        <VDatePicker
            transparent
            borderless
            expanded
            title-position="left"
            v-model.range="range"
            :select-attribute="selectDragAttribute"
            :drag-attribute="selectDragAttribute"
            @drag="dragValue = $event"
            :color="selectedColor"
        >
            <template #day-popover="{ format }">
                <div class="text-sm">
                    {{
                        format(
                            dragValue ? dragValue.start : range.start,
                            "MMM D"
                        )
                    }}
                    -
                    {{ format(dragValue ? dragValue.end : range.end, "MMM D") }}
                </div>
            </template>
            <template #footer>
                <div class="w-full px-4 pb-3">
                    <v-btn rounded class="ma-2" @click="moveToday">
                        Apply for {{ moment(range.start).format("Do MMM") }}
                    </v-btn>
                </div>
            </template>
        </VDatePicker>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed } from "vue";
    import moment from "moment";
    console.log(new Date());
    let date = new Date();
    // for VCalendar
    const selectedColor = ref("gray");
    const range = ref({
        start: date,
        end: date,
    });

    console.log(moment(date).format("DD-MM-YYYY"));
    const dragValue = ref(null);
    const selectDragAttribute = computed(() => ({
        popover: {
            visibility: "hover",
            isInteractive: false,
        },
    }));

    function moveToday() {
        alert("Applied for leave");
    }
</script>

<style scoped>
    .DatePicker-wrapper {
        min-width: 325px;
        max-width: 375px;
    }
</style>
