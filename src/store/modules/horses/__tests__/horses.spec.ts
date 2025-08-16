import { moduleHorses } from "@/store/modules/horses";
import {
  HORSE_GETTERS,
  HORSE_MUTATIONS,
  HORSE_ACTIONS,
  HorsesState,
  RoundResult,
} from "@/store/modules/horses/models";
import {
  generateRandomHorses,
  generateSchedule,
} from "@/store/modules/horses/utils";

jest.mock("@/store/modules/horses/utils", () => ({
  generateRandomHorses: jest.fn(),
  generateSchedule: jest.fn(),
}));

const mockGenerateRandomHorses = generateRandomHorses as jest.MockedFunction<
  typeof generateRandomHorses
>;
const mockGenerateSchedule = generateSchedule as jest.MockedFunction<
  typeof generateSchedule
>;

describe("Horses Store Module", () => {
  let state: HorsesState;

  beforeEach(() => {
    jest.clearAllMocks();

    state = moduleHorses.state();
  });

  describe("State", () => {
    it("should initialize with default values", () => {
      expect(state.roundCounts).toBe(6);
      expect(state.horses).toEqual([]);
      expect(state.schedule).toEqual([]);
      expect(state.currentRound).toBe(0);
      expect(state.raceFinished).toBe(false);
      expect(state.roundResults).toEqual([]);
    });
  });

  describe("Getters", () => {
    it("should return all horses", () => {
      const horses = [
        {
          id: 1,
          name: "Test Horse",
          color: "red",
          condition: 100,
          position: 0,
          finishedRank: 0,
          finishTime: 0,
        },
      ];
      state.horses = horses;

      const result = moduleHorses.getters[HORSE_GETTERS.ALL_HORSES](state);
      expect(result).toEqual(horses);
    });

    it("should return race schedule list", () => {
      const schedule = [{ round: 1, distance: 100, participants: [] }];
      state.schedule = schedule;

      const result =
        moduleHorses.getters[HORSE_GETTERS.RACE_SCHEDULE_LIST](state);
      expect(result).toEqual(schedule);
    });

    it("should return race in progress status", () => {
      const result =
        moduleHorses.getters[HORSE_GETTERS.RACE_IN_PROGRESS](state);
      expect(result).toBe(false);
    });

    it("should return current round", () => {
      state.currentRound = 3;

      const result = moduleHorses.getters[HORSE_GETTERS.CURRENT_ROUND](state);
      expect(result).toBe(3);
    });

    it("should return race finished status", () => {
      state.raceFinished = true;

      const result = moduleHorses.getters[HORSE_GETTERS.RACE_FINISHED](state);
      expect(result).toBe(true);
    });

    it("should return round results", () => {
      const results = [
        { round: 1, distance: 100, participants: [], finishedHorses: [] },
      ];
      state.roundResults = results;

      const result = moduleHorses.getters[HORSE_GETTERS.ROUND_RESULTS](state);
      expect(result).toEqual(results);
    });
  });

  describe("Mutations", () => {
    it("should set horses", () => {
      const horses = [
        {
          id: 1,
          name: "Test Horse",
          color: "red",
          condition: 100,
          position: 0,
          finishedRank: 0,
          finishTime: 0,
        },
      ];

      moduleHorses.mutations[HORSE_MUTATIONS.SET_HORSES](state, horses);
      expect(state.horses).toEqual(horses);
    });

    it("should set schedule", () => {
      const schedule = [{ round: 1, distance: 100, participants: [] }];

      moduleHorses.mutations[HORSE_MUTATIONS.SET_SCHEDULE](state, schedule);
      expect(state.schedule).toEqual(schedule);
    });

    it("should set current round", () => {
      moduleHorses.mutations[HORSE_MUTATIONS.SET_CURRENT_ROUND](state, 5);
      expect(state.currentRound).toBe(5);
    });

    it("should set race finished status", () => {
      moduleHorses.mutations[HORSE_MUTATIONS.SET_RACE_FINISHED](state, true);
      expect(state.raceFinished).toBe(true);
    });

    it("should set round results", () => {
      const results = [
        { round: 1, distance: 100, participants: [], finishedHorses: [] },
      ];

      moduleHorses.mutations[HORSE_MUTATIONS.SET_ROUND_RESULTS](state, results);
      expect(state.roundResults).toEqual(results);
    });
  });

  describe("Actions", () => {
    let commit: jest.Mock;

    beforeEach(() => {
      jest.clearAllMocks();

      commit = jest.fn();
    });

    describe("generateHorses", () => {
      it("should generate horses and reset schedule", async () => {
        const mockHorses = [
          {
            id: 1,
            name: "Test Horse",
            color: "red",
            condition: 100,
            position: 0,
            finishedRank: 0,
            finishTime: 0,
          },
        ];
        mockGenerateRandomHorses.mockReturnValue(mockHorses);

        await moduleHorses.actions[HORSE_ACTIONS.GENERATE_HORSES]({
          commit,
        } as any);

        expect(mockGenerateRandomHorses).toHaveBeenCalledWith(20);
        expect(commit).toHaveBeenCalledWith(
          HORSE_MUTATIONS.SET_HORSES,
          mockHorses
        );
        expect(commit).toHaveBeenCalledWith(HORSE_MUTATIONS.SET_SCHEDULE, []);
      });
    });

    describe("createSchedule", () => {
      it("should create schedule and reset race values", async () => {
        const mockSchedule = [{ round: 1, distance: 100, participants: [] }];
        mockGenerateSchedule.mockReturnValue(mockSchedule);

        await moduleHorses.actions[HORSE_ACTIONS.CREATE_SCHEDULE]({
          commit,
          state,
        } as any);

        expect(mockGenerateSchedule).toHaveBeenCalledWith(state.horses);
        expect(commit).toHaveBeenCalledWith(
          HORSE_MUTATIONS.SET_SCHEDULE,
          mockSchedule
        );
        expect(commit).toHaveBeenCalledWith(
          HORSE_MUTATIONS.SET_CURRENT_ROUND,
          0
        );
        expect(commit).toHaveBeenCalledWith(
          HORSE_MUTATIONS.SET_RACE_FINISHED,
          false
        );
        expect(commit).toHaveBeenCalledWith(
          HORSE_MUTATIONS.SET_ROUND_RESULTS,
          []
        );
      });
    });

    describe("resetRaceValues", () => {
      it("should reset all race-related values", async () => {
        await moduleHorses.actions[HORSE_ACTIONS.RESET_RACE_VALUES]({
          commit,
        } as any);

        expect(commit).toHaveBeenCalledWith(
          HORSE_MUTATIONS.SET_CURRENT_ROUND,
          0
        );
        expect(commit).toHaveBeenCalledWith(
          HORSE_MUTATIONS.SET_RACE_FINISHED,
          false
        );
        expect(commit).toHaveBeenCalledWith(
          HORSE_MUTATIONS.SET_ROUND_RESULTS,
          []
        );
      });
    });
  });

  describe("Module Configuration", () => {
    it("should be namespaced", () => {
      expect(moduleHorses.namespaced).toBe(true);
    });

    it("should have all required properties", () => {
      expect(moduleHorses).toHaveProperty("state");
      expect(moduleHorses).toHaveProperty("getters");
      expect(moduleHorses).toHaveProperty("mutations");
      expect(moduleHorses).toHaveProperty("actions");
    });

    it("should have state as a function", () => {
      expect(typeof moduleHorses.state).toBe("function");
    });

    it("should have getters as an object", () => {
      expect(typeof moduleHorses.getters).toBe("object");
    });

    it("should have mutations as an object", () => {
      expect(typeof moduleHorses.mutations).toBe("object");
    });

    it("should have actions as an object", () => {
      expect(typeof moduleHorses.actions).toBe("object");
    });
  });

  describe("Integration Tests", () => {
    it("should handle complete race flow", async () => {
      const mockHorses = [
        {
          id: 1,
          name: "Test Horse",
          color: "red",
          condition: 100,
          position: 0,
          finishedRank: 0,
          finishTime: 0,
        },
      ];
      const mockSchedule = [
        { round: 1, distance: 100, participants: mockHorses },
      ];

      mockGenerateRandomHorses.mockReturnValue(mockHorses);
      mockGenerateSchedule.mockReturnValue(mockSchedule);

      const commit = (mutation: string, payload: any) => {
        switch (mutation) {
          case HORSE_MUTATIONS.SET_HORSES:
            state.horses = payload;
            break;
          case HORSE_MUTATIONS.SET_SCHEDULE:
            state.schedule = payload;
            break;
          case HORSE_MUTATIONS.SET_CURRENT_ROUND:
            state.currentRound = payload;
            break;
          case HORSE_MUTATIONS.SET_RACE_FINISHED:
            state.raceFinished = payload;
            break;
          case HORSE_MUTATIONS.SET_ROUND_RESULTS:
            state.roundResults = payload;
            break;
        }
      };

      await moduleHorses.actions[HORSE_ACTIONS.GENERATE_HORSES]({
        commit,
      } as any);

      await moduleHorses.actions[HORSE_ACTIONS.CREATE_SCHEDULE]({
        commit,
        state,
      } as any);

      expect(state.horses).toEqual(mockHorses);
      expect(state.schedule).toEqual(mockSchedule);
      expect(state.currentRound).toBe(0);
      expect(state.raceFinished).toBe(false);
      expect(state.roundResults).toEqual([]);
    });

    it("should reset race values correctly", async () => {
      state.currentRound = 5;
      state.raceFinished = true;
      state.roundResults = [
        { round: 1, distance: 100, participants: [], finishedHorses: [] },
      ];

      const commit = (
        mutation: string,
        payload: number | boolean | RoundResult[]
      ) => {
        switch (mutation) {
          case HORSE_MUTATIONS.SET_CURRENT_ROUND:
            state.currentRound = payload as number;
            break;
          case HORSE_MUTATIONS.SET_RACE_FINISHED:
            state.raceFinished = payload as boolean;
            break;
          case HORSE_MUTATIONS.SET_ROUND_RESULTS:
            state.roundResults = payload as RoundResult[];
            break;
        }
      };

      await moduleHorses.actions[HORSE_ACTIONS.RESET_RACE_VALUES]({
        commit,
      } as any);

      expect(state.currentRound).toBe(0);
      expect(state.raceFinished).toBe(false);
      expect(state.roundResults).toEqual([]);
    });
  });
});
