<template>
  <div class="home">
    <HorseRacingApp />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HorseRacingApp from "@/components/HorseRacingApp.vue";

@Component({
  components: {
    HorseRacingApp,
  },
})
export default class HomeView extends Vue {}
</script>
