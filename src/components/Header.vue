<template>
  <div class="header">
    <div class="pageTitle">Horse Racing</div>
    <div class="raceActionBtns">
      <button
        :disabled="disableGenerateHorsesBtn"
        class="btn"
        @click="onGenerateHorsesClick"
        v-bind="
          getTestAttributes({
            module: 'horse-racing',
            description: 'generate-horses',
            element: 'btn',
          })
        "
      >
        Generate Horse List
      </button>
      <button
        :disabled="disableGenerateScheduleBtn"
        class="btn"
        v-if="showGenerateScheduleBtn"
        @click="onGenerateScheduleClick"
        v-bind="
          getTestAttributes({
            module: 'horse-racing',
            description: 'generate-schedule',
            element: 'btn',
          })
        "
      >
        Generate Race Schedule
      </button>
    </div>
  </div>
</template>

<script>
import { getTestAttributes } from "@/utils/getTestAttributes";

export default {
  name: "HeaderSection",
  props: {
    disableGenerateHorsesBtn: {
      type: Boolean,
      default: false,
    },
    disableGenerateScheduleBtn: {
      type: Boolean,
      default: false,
    },
    showGenerateScheduleBtn: {
      type: Boolean,
      default: false,
    },
    onGenerateHorsesClick: {
      type: Function,
      required: true,
    },
    onGenerateScheduleClick: {
      type: Function,
      required: true,
    },
  },
  methods: {
    getTestAttributes,
  },
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  background: lightblue;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;

  .pageTitle {
    font-size: 20px;
    font-weight: bold;
  }

  .raceActionBtns {
    display: flex;
    gap: 12px;

    .btn {
      padding: 8px 12px;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      background-color: #007bff;
      color: white;

      &:disabled {
        background-color: #6c757d;
        cursor: not-allowed;
      }

      &:hover:not(:disabled) {
        background-color: #0056b3;
      }
    }
  }
}
</style>
