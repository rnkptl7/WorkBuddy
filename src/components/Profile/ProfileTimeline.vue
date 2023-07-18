<template>
    <main class="flex-fill timeline">
        <div class="text-center">
            <v-btn class="ma-2" rounded @click="toggleModal">
                Add Achievements
            </v-btn>
        </div>

        <v-timeline
            v-if="!noAchievement"
            line-thickness="5"
            line-color="#6eb4d933"
        >
            <v-timeline-item
                v-for="(achievement, index) in achievements"
                :key="index"
                small
                dot-color="#115173"
                size="20"
            >
                <div>
                    <div>
                        <p :class="`font-weight-regular text-h6`">
                            {{ achievement.title }}
                        </p>
                        <p :class="`font-weight-regular text-h7`">
                            {{ achievement.titleDate }}
                        </p>
                        <p :class="`font-italic title-description`">
                            {{ achievement.titleDescription }}
                        </p>
                    </div>
                </div>
            </v-timeline-item>
        </v-timeline>
        <div v-else class="text-center">
            <img
                src="../../assets/images/no-achievement.jpg"
                alt="No achievements"
            />
            <p>No achievements available</p>
        </div>
    </main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useProfileStore } from "../../stores/profileStore";

const store = useProfileStore();
const { achievements, openModal: dialog } = storeToRefs(store);
const { getAchievement } = store;
const noAchievement = ref(false);

function toggleModal() {
    dialog.value = true;
}
onMounted(async () => {
    await getAchievement();
    noAchievement.value = achievements.value.length === 0;
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
