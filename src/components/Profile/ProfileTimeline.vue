<template>
    <main class="flex-fill timeline">
        <div class="text-center">
            <v-btn class="ma-2" rounded @click="toggleModal">
                Add Achievements
            </v-btn>
        </div>
        <v-timeline line-thickness="5" line-color="#6eb4d933">
            <v-timeline-item
                v-for="(achievement, index) in achievements"
                :key="index"
                small
                dot-color="#115173 "
                size="20"
            >
                <div>
                    <div>
                        <p :class="`font-weight-regular text-h6 `">
                            {{ achievement.title }}
                        </p>
                        <p :class="`font-weight-regular text-h7 `">
                            {{ achievement.titleDate }}
                        </p>
                        <p :class="`font-italic title-descprition`">
                            {{ achievement.titleDescription }}
                        </p>
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
const { getAchievement, getLeavesRecord } = store;

function toggleModal() {
    dialog.value = true;
}
onMounted(async () => {
    await getAchievement();
    await getLeavesRecord();
});
</script>
<style scoped>
.headline {
    color: var(--primary-color);
    font-size: 20px;
}
.text-h6,
.text-h7 {
    color: var(--primary-color);
}
.v-timeline-divider__dot {
    height: 10px !important;
    width: 10px !important;
}
.title-descprition {
    width: 150px;
}
</style>
