<template>
  <div
    class="raceResults"
    v-bind="
      getTestAttributes({
        module: 'horse-racing',
        description: 'race-results',
        element: 'div',
      })
    "
  >
    <div class="allRoundsSummary">
      <h4>All Rounds Summary</h4>
      <div class="roundsList">
        <div
          v-for="(round, roundIndex) in rounds"
          :key="round.round"
          class="roundSummary"
          :class="{ currentRound: round.round === currentRound + 1 }"
          v-bind="
            getTestAttributes({
              module: 'horse-racing',
              description: 'all-round-results-item-' + roundIndex,
              element: 'btn',
            })
          "
        >
          <div class="roundHeader">
            <span class="roundNumber">Round {{ round.round }}</span>
            <span class="roundDistance">{{ round.distance }}m</span>
          </div>
          <div class="roundWinners">
            <span
              v-for="(horse, horseIndex) in round.finishedHorses"
              :key="horse.id"
              class="winner"
            >
              {{ horseIndex + 1 }}. {{ horse.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTestAttributes } from "@/utils/getTestAttributes";

export default {
  name: "RaceResults",
  props: {
    rounds: {
      type: Array,
      required: true,
    },
    currentRound: {
      type: Number,
      required: true,
    },
  },
  methods: {
    getTestAttributes,
  },
};
</script>

<style lang="scss" scoped>
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
