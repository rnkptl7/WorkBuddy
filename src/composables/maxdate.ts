import { computed } from "vue";

export const useMaxDate = computed(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
});
