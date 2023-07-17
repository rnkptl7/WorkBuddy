<template>
    <main class="flex-fill">
        <div class="text-center">
            <v-btn class="ma-2" rounded @click="toggleModal">
                Add Achievements
            </v-btn>
        </div>
        <v-timeline>
            <v-timeline-item
                v-for="(achievement, index) in achievements"
                :key="index"
                small
            >
                <template v-slot:opposite>
                    <div
                        :class="`pt-1 headline font-weight-bold`"
                        v-text="achievement.titleDate"
                    ></div>
                </template>
                <div>
                    <h2
                        :class="`mt-n1 headline text-amber font-weight-light mb-4`"
                    >
                        {{ achievement.title }}
                    </h2>
                    <div>
                        {{ achievement.titleDescription }}
                    </div>
                </div>
            </v-timeline-item>
        </v-timeline>
    </main>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useProfileStore } from "../../stores/profileStore";

const store = useProfileStore();
const { achievements, openModal: dialog } = storeToRefs(store);
const { getAchievement } = store;

function toggleModal() {
    dialog.value = true;
}
onMounted(async () => {
    await getAchievement();
});
</script>
