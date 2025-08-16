<template>
  <div class="main">
    <HeaderSection
      :disableGenerateHorsesBtn="isAnimating"
      :disableGenerateScheduleBtn="isAnimating"
      :showGenerateScheduleBtn="allHorses.length > 0"
      :onGenerateHorsesClick="generateHorses"
      :onGenerateScheduleClick="raceSchedule"
    />
    <div class="content">
      <AvailableHorsesArea :horses="allHorses" />
      <RaceArea
        ref="raceArea"
        @race-finished="onRaceFinished"
        @race-toggled="onRaceToggled"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import { getTestAttributes } from "@/utils/getTestAttributes";
import {
  MODULE_NAME,
  HORSE_GETTERS,
  HORSE_ACTIONS,
} from "@/store/modules/horses/models";

import HeaderSection from "./Header.vue";
import AvailableHorsesArea from "./Race/components/AvailableHorsesArea.vue";
import RaceArea from "./Race/components/RaceArea.vue";

export default {
  name: "HorseRacingApp",
  data: function () {
    return {
      isAnimating: false,
    };
  },
  components: {
    RaceArea,
    HeaderSection,
    AvailableHorsesArea,
  },
  computed: {
    ...mapGetters(MODULE_NAME, [
      HORSE_GETTERS.ALL_HORSES,
      HORSE_GETTERS.RACE_SCHEDULE_LIST,
      HORSE_GETTERS.RACE_IN_PROGRESS,
    ]),
  },
  methods: {
    getTestAttributes,
    onRaceToggled(isStarting) {
      this.isAnimating = isStarting;
    },
    onRaceFinished() {
      this.isAnimating = false;
    },

    generateHorses() {
      this.$store.dispatch(`${MODULE_NAME}/${HORSE_ACTIONS.GENERATE_HORSES}`);
    },

    raceSchedule() {
      this.$store.dispatch(`${MODULE_NAME}/${HORSE_ACTIONS.CREATE_SCHEDULE}`);
      this.$store.dispatch(`${MODULE_NAME}/${HORSE_ACTIONS.RESET_RACE_VALUES}`);
      this.$refs.raceArea.resetRace();
    },
  },
};
</script>
<style lang="scss" scoped>
.main {
  height: 100vh;
  overflow-y: hidden;
}

.content {
  display: flex;
  height: calc(100vh - 60px);
}
</style>
