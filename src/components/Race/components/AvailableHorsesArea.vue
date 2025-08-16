<template>
  <div
    class="availableHorsesArea"
    v-bind="
      getTestAttributes({
        module: 'horse-racing',
        description: 'available-horses-area',
        element: 'div',
      })
    "
  >
    <div
      class="horse"
      v-for="(horse, horseIndex) in horses"
      :key="horse.id"
      v-bind="
        getTestAttributes({
          module: 'horse-racing',
          description: 'all-horses-horse-' + horseIndex,
          element: 'div',
        })
      "
    >
      <div class="horseInfo">
        <span
          class="horseName"
          v-bind="
            getTestAttributes({
              module: 'horse-racing',
              description: 'all-horses-horse-name-' + horseIndex,
              element: 'span',
            })
          "
        >
          {{ horse.name }}
        </span>
        <span
          class="horseCondition"
          v-bind="
            getTestAttributes({
              module: 'horse-racing',
              description: 'all-horses-horse-condition-' + horseIndex,
              element: 'span',
            })
          "
        >
          Condition: {{ horse.condition }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getTestAttributes } from "@/utils/getTestAttributes";

export default {
  name: "AvailableHorsesArea",
  props: {
    horses: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  methods: {
    getTestAttributes,
  },
};
</script>

<style lang="scss" scoped>
.availableHorsesArea {
  overflow: auto;
  height: 100%;
  padding: 20px;
  background-color: #fff;
  border-left: 1px solid #cdd2d7;
  overflow-y: auto;
  width: 300px;
  flex-shrink: 0;

  .horse {
    padding: 15px;
    border-bottom: 1px solid #e9ecef;
    background-color: white;
    margin-bottom: 10px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    &:hover {
      background-color: #e9ecef;
      transform: translateY(-1px);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
      transition: all 0.2s ease;
    }

    .horseInfo {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;

      .horseName {
        font-weight: 500;
        color: #495057;
        min-width: 100px;
      }

      .horseCondition {
        color: #6c757d;
        font-size: 14px;
      }
    }
  }
}
</style>
