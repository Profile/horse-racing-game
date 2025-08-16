import {
  Horse,
  RaceSchedule,
  HorsesState,
  HORSE_GETTERS,
  RoundResult,
  HORSE_MUTATIONS,
  HORSE_ACTIONS,
} from "./models";

import { generateRandomHorses, generateSchedule } from "./utils";

import { ActionContext } from "vuex";

export const moduleHorses = {
  namespaced: true,
  state: (): HorsesState => ({
    roundCounts: 6,
    horses: [],
    schedule: [],
    currentRound: 0,
    raceFinished: false,
    roundResults: [],
  }),
  getters: {
    [HORSE_GETTERS.ALL_HORSES]: (state: HorsesState): Horse[] => state.horses,
    [HORSE_GETTERS.RACE_SCHEDULE_LIST]: (state: HorsesState): RaceSchedule[] =>
      state.schedule,
    [HORSE_GETTERS.RACE_IN_PROGRESS]: (state: HorsesState): boolean => false,
    [HORSE_GETTERS.CURRENT_ROUND]: (state: HorsesState): number =>
      state.currentRound,
    [HORSE_GETTERS.RACE_FINISHED]: (state: HorsesState): boolean =>
      state.raceFinished,
    [HORSE_GETTERS.ROUND_RESULTS]: (state: HorsesState): RoundResult[] =>
      state.roundResults,
  },
  mutations: {
    [HORSE_MUTATIONS.SET_HORSES](state: HorsesState, horses: Horse[]): void {
      state.horses = horses;
    },
    [HORSE_MUTATIONS.SET_SCHEDULE](
      state: HorsesState,
      schedule: RaceSchedule[]
    ): void {
      state.schedule = schedule;
    },
    [HORSE_MUTATIONS.SET_CURRENT_ROUND](
      state: HorsesState,
      round: number
    ): void {
      state.currentRound = round;
    },
    [HORSE_MUTATIONS.SET_RACE_FINISHED](
      state: HorsesState,
      finished: boolean
    ): void {
      state.raceFinished = finished;
    },
    [HORSE_MUTATIONS.SET_ROUND_RESULTS](
      state: HorsesState,
      results: RoundResult[]
    ): void {
      state.roundResults = results;
    },
  },
  actions: {
    async [HORSE_ACTIONS.GENERATE_HORSES]({
      commit,
    }: ActionContext<HorsesState, unknown>): Promise<void> {
      const horses = generateRandomHorses(20);
      commit(HORSE_MUTATIONS.SET_HORSES, horses);
      commit(HORSE_MUTATIONS.SET_SCHEDULE, []);
    },
    async [HORSE_ACTIONS.CREATE_SCHEDULE]({
      commit,
      state,
    }: ActionContext<HorsesState, unknown>): Promise<void> {
      const schedule = generateSchedule(state.horses);
      commit(HORSE_MUTATIONS.SET_SCHEDULE, schedule);

      commit(HORSE_MUTATIONS.SET_CURRENT_ROUND, 0);
      commit(HORSE_MUTATIONS.SET_RACE_FINISHED, false);
      commit(HORSE_MUTATIONS.SET_ROUND_RESULTS, []);
    },

    async [HORSE_ACTIONS.RESET_RACE_VALUES]({
      commit,
    }: ActionContext<HorsesState, unknown>): Promise<void> {
      commit(HORSE_MUTATIONS.SET_CURRENT_ROUND, 0);
      commit(HORSE_MUTATIONS.SET_RACE_FINISHED, false);
      commit(HORSE_MUTATIONS.SET_ROUND_RESULTS, []);
    },
  },
};
