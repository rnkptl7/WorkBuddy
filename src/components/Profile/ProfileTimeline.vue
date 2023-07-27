<template>
    <main class="flex-fill timeline">
        <div class="text-center">
            <v-btn class="ma-2" rounded @click="toggleModal">
                Add Achievements
            </v-btn>
        </div>
        <div v-if="achievements.length === 0" class="no_achivement_container">
            <div class="no_achievement_placeholder">
                <h4 class="mt-15">No Achievements!</h4>
            </div>
        </div>
        <v-timeline v-else line-thickness="5" line-color="#6eb4d933">
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
    </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useProfileStore } from "../../stores/profileStore";
import { getAchievement } from "../../api/api";
onMounted(async (): Promise<void> => {
    const docSnap = await getAchievement();
    achievements.value = docSnap.data().achievementList || [];
});

const store = useProfileStore();
const { achievements, openModal: dialog } = storeToRefs(store);

function toggleModal(): void {
    dialog.value = true;
}
</script>
<style scoped>
.no_achivement_container {
    display: flex;
    justify-content: center;
}

.no_achievement_placeholder {
    margin-block: 1rem;
    border-radius: 5%;
    height: 200px;
    width: 50%;
    text-align: center;
    color: var(--primary-color);
    border: 5px dashed var(--secondary-color);
}
button:hover {
    background-color: var(--secondary-color);
}
.title-description {
    width: 150px;
}
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
@media screen and (max-width: 400px) {
    .title-description {
        width: 100px;
    }
}
</style>
