<template>
  <div
    class="raceArea"
    v-if="raceScheduleList.length"
    v-bind="
      getTestAttributes({
        module: 'horse-racing',
        description: 'race-area',
        element: 'div',
      })
    "
  >
    <div class="raceControls">
      <div class="roundInfo">
        <span>Round {{ currentRound + 1 }} of {{ totalRounds }}</span>
        <span v-if="raceFinished" class="roundComplete">✓ Completed</span>
      </div>
      <div v-if="allRoundResults.length < 6" class="raceButtons">
        <button
          class="btn"
          v-if="!allRoundResults.length"
          @click="startRace"
          :disabled="isAnimating || allFinished"
          v-bind="
            getTestAttributes({
              module: 'horse-racing',
              description: 'race-area-start-race',
              element: 'btn',
            })
          "
        >
          Start Race
        </button>
        <button
          v-else
          :disabled="isAnimating || !canStartNextRound"
          @click="startNextRound"
          class="btn nextRoundBtn"
          v-bind="
            getTestAttributes({
              module: 'horse-racing',
              description: 'race-area-start-next-round',
              element: 'btn',
            })
          "
        >
          Start Next Round
        </button>
      </div>
    </div>
    <div class="raceTrackAndResultWrapper">
      <div class="raceTrack">
        <RacingHorse
          v-for="(horse, horseIndex) in currentRace.participants"
          :key="horse.id"
          :horse="horse"
          :horseOrder="horseIndex + 1"
          :raceDistance="raceDistance"
        />
      </div>
      <RaceResults
        v-if="allRoundResults.length"
        :rounds="allRoundResults"
        :currentRound="currentRound"
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
  HORSE_MUTATIONS,
} from "@/store/modules/horses/models";

import RacingHorse from "./RacingHorse.vue";
import RaceResults from "./RaceResults.vue";

export default {
  name: "RaceArea",
  data() {
    return {
      isAnimating: false,
      animationId: null,
      raceStartTime: 0,
      raceFinished: false,
      currentRound: 0,
      allRoundResults: [],
      roundResults: [],
    };
  },
  components: {
    RacingHorse,
    RaceResults,
  },
  computed: {
    ...mapGetters(MODULE_NAME, [
      HORSE_GETTERS.ALL_HORSES,
      HORSE_GETTERS.RACE_SCHEDULE_LIST,
      HORSE_GETTERS.RACE_IN_PROGRESS,
    ]),
    currentRace() {
      return (
        this.raceScheduleList[this.currentRound] || {
          participants: [],
          distance: 0,
        }
      );
    },
    allFinished() {
      return this.currentRace.participants.every((p) => p.finishedRank);
    },
    raceDistance() {
      return 600;
    },
    finishedHorses() {
      return this.currentRace.participants
        .filter((horse) => horse.finishedRank > 0)
        .sort((a, b) => a.finishedRank - b.finishedRank);
    },
    canStartNextRound() {
      return (
        this.raceFinished &&
        this.currentRound < this.raceScheduleList.length - 1
      );
    },
    totalRounds() {
      return this.raceScheduleList.length;
    },
  },

  mounted() {
    this.syncWithGlobalState();
  },

  methods: {
    getTestAttributes,
    syncWithGlobalState() {
      const globalState = this.$store.state[MODULE_NAME];
      this.currentRound = globalState.currentRound || 0;
      this.raceFinished = globalState.raceFinished || false;
      this.allRoundResults = globalState.roundResults || [];
    },

    resetAllStates() {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }

      this.isAnimating = false;
      this.raceStartTime = 0;
      this.raceFinished = false;

      if (this.currentRace.participants) {
        this.currentRace.participants.forEach((horse) => {
          horse.position = 0;
          horse.finishedRank = 0;
          horse.finishTime = 0;
        });
      }
    },

    resetRace() {
      this.stopRace();
      this.resetAllStates();
      this.currentRound = 0;
      this.allRoundResults = [];
      this.roundResults = [];
    },

    startRace() {
      if (this.isAnimating) return;

      this.isAnimating = true;
      this.raceFinished = false;
      this.raceStartTime = Date.now();

      this.currentRace.participants.forEach((horse) => {
        horse.position = 0;
        horse.finishedRank = 0;
        horse.finishTime = 0;
      });

      this.animateRace();
      this.$emit("race-toggled", true);
    },

    startNextRound() {
      if (this.canStartNextRound) {
        this.currentRound++;
        this.raceFinished = false;

        this.$store.commit(
          `${MODULE_NAME}/${HORSE_MUTATIONS.SET_CURRENT_ROUND}`,
          this.currentRound
        );
        this.$store.commit(
          `${MODULE_NAME}/${HORSE_MUTATIONS.SET_RACE_FINISHED}`,
          false
        );

        this.resetAllStates();
        this.startRace();
      }
    },

    stopRace() {
      this.isAnimating = false;
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }
      this.$emit("race-toggled", false);
    },

    animateRace() {
      if (!this.isAnimating) return;

      const currentTime = Date.now();
      const seconds = 1000;
      const elapsed = (currentTime - this.raceStartTime) / seconds;

      let allFinished = true;

      this.currentRace.participants.forEach((horse) => {
        if (horse.finishedRank > 0) return;

        const CONDITION_MULTIPLIER = 2;
        const BASE_SPEED = 1;
        const MAX_CONDITION = 100;

        const speed =
          (horse.condition / MAX_CONDITION) * CONDITION_MULTIPLIER + BASE_SPEED;
        const newPosition = Math.min(horse.position + speed, this.raceDistance);

        horse.position = newPosition;

        const horseFinished =
          newPosition >= this.raceDistance && horse.finishedRank === 0;

        if (horseFinished) {
          const finishedCount = this.currentRace.participants.filter(
            (h) => h.finishedRank > 0
          ).length;
          horse.finishedRank = finishedCount + 1;
          horse.finishTime = elapsed;
        }

        if (horse.finishedRank === 0) {
          allFinished = false;
        }
      });

      if (allFinished) {
        this.raceFinished = true;
        this.isAnimating = false;

        const roundResult = {
          round: this.currentRound + 1,
          distance: this.currentRace.distance,
          participants: this.currentRace.participants,
          finishedHorses: this.finishedHorses,
        };

        this.roundResults = roundResult;
        this.allRoundResults.push(roundResult);

        this.$store.commit(
          `${MODULE_NAME}/${HORSE_MUTATIONS.SET_CURRENT_ROUND}`,
          this.currentRound
        );
        this.$store.commit(
          `${MODULE_NAME}/${HORSE_MUTATIONS.SET_RACE_FINISHED}`,
          true
        );
        this.$store.commit(
          `${MODULE_NAME}/${HORSE_MUTATIONS.SET_ROUND_RESULTS}`,
          this.allRoundResults
        );

        this.$emit("race-finished", true);
        return;
      }

      this.animationId = requestAnimationFrame(this.animateRace);
    },
  },

  beforeDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  },
};
</script>

<style lang="scss" scoped>
.raceTrackAndResultWrapper {
  display: flex;
  width: 100%;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:disabled {
    background-color: #6c757d !important;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }

  &.nextRoundBtn {
    background-color: #28a745;
  }
}
.raceArea {
  flex-shrink: 0;
  padding: 20px;
  flex: 1;
}
.raceControls {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;

  .roundInfo {
    display: flex;
    align-items: center;
    gap: 15px;
    font-weight: 500;

    .roundComplete {
      color: #28a745;
      font-weight: bold;
    }
  }

  .raceButtons {
    display: flex;
    gap: 10px;
  }
}

.raceTrack {
  border: 2px solid #333;
  border-radius: 8px;
  overflow: hidden;
  width: 850px;
  height: 605px;
  flex-shrink: 0;
}

.raceAreaItem {
  height: 60px;
  display: flex;
  background: #f8f9fa;
  border-bottom: 1px solid #dee2e6;

  &:last-child {
    border-bottom: none;
  }

  .raceAreaItemPosition {
    width: 40px;
    background-color: #28a745;
    color: white;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 14px;
  }

  .raceItemFixedWrapper {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    position: relative;
    padding: 0 20px;

    &.finished {
      background-color: #d4edda;
    }

    .horseName {
      min-width: 60px;
      font-weight: 500;
      margin-right: 20px;
    }

    .horseImage {
      width: 40px;
    }

    .raceTrackContainer {
      flex: 1;
      height: 100%;
      position: relative;
      background: linear-gradient(to right, #e9ecef 0%, #f8f9fa 100%);
      border-radius: 4px;
      overflow: hidden;
    }

    .racedItem {
      position: absolute;
      top: 15px;
      left: 0px;
      transition: transform 0.1s ease-out;
      z-index: 1;
    }

    .finishLine {
      position: absolute;
      top: 0;
      width: 3px;
      height: 100%;
      background-color: #dc3545;
      z-index: 1;
    }
  }
}

.raceInfo {
  margin-top: 20px;
  padding: 15px;
  background-color: #e7f3ff;
  border-radius: 4px;
  border-left: 4px solid #007bff;

  p {
    margin: 5px 0;
    font-weight: 500;
  }
}

.raceResults {
  margin-left: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #dee2e6;

  .allRoundsSummary {
    h4 {
      color: #495057;
      margin-bottom: 15px;
      font-size: 16px;
      border-bottom: 1px solid #dee2e6;
      padding-bottom: 8px;
    }

    .roundsList {
      width: 412px;
      display: flex;
      gap: 12px;
      flex-wrap: wrap;

      .roundSummary {
        padding: 12px;
        background-color: #fff;
        border-radius: 6px;
        border: 1px solid #e9ecef;
        list-style: none;
        width: 200px;
        overflow: auto;
        height: 158px;

        &:last-child {
          margin-bottom: 0;
        }

        &.currentRound {
          border-color: #007bff;
          background-color: #e7f3ff;
        }

        .roundHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;

          .roundNumber {
            font-weight: bold;
            color: #495057;
            font-size: 14px;
          }

          .roundDistance {
            color: #6c757d;
            font-size: 12px;
            background-color: #e9ecef;
            padding: 2px 8px;
            border-radius: 12px;
          }
        }

        .roundWinners {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
      }
    }
  }
}
</style>
