export const MODULE_NAME = "horses";

export enum RaceAction {
  STOP = "STOP",
  START = "START",
}

export const HORSE_MUTATIONS = {
  SET_HORSES: "setHorses",
  SET_SCHEDULE: "setSchedule",
  SET_CURRENT_ROUND: "setCurrentRound",
  SET_RACE_FINISHED: "setRaceFinished",
  SET_ROUND_RESULTS: "setRoundResults",
} as const;

export const HORSE_ACTIONS = {
  GENERATE_HORSES: "generateHorses",
  CREATE_SCHEDULE: "createSchedule",
  RESET_RACE_VALUES: "resetRaceValues",
} as const;

export const HORSE_GETTERS = {
  ALL_HORSES: "allHorses",
  RACE_SCHEDULE_LIST: "raceScheduleList",
  RACE_IN_PROGRESS: "raceInProgress",
  CURRENT_ROUND: "currentRound",
  RACE_FINISHED: "raceFinished",
  ROUND_RESULTS: "roundResults",
} as const;

export type Horse = {
  id: number;
  name: string;
  color: string;
  condition: number;
  position: number;
  finishedRank: number;
  finishTime: number;
};

export type RaceParticipant = Horse;

export type RoundResult = {
  round: number;
  distance: number;
  participants: RaceParticipant[];
  finishedHorses: RaceParticipant[];
};

export type RaceSchedule = {
  round: number;
  distance: number;
  participants: RaceParticipant[];
};

export type HorsesState = {
  roundCounts: number;
  horses: Horse[];
  schedule: RaceSchedule[];
  currentRound: number;
  raceFinished: boolean;
  roundResults: RoundResult[];
};

export type HorsesGetters = {
  allHorses: Horse[];
  raceScheduleList: RaceSchedule[];
  raceInProgress: boolean;
  currentRound: number;
  raceFinished: boolean;
  roundResults: RoundResult[];
};

export type HorsesMutations = {
  setHorses: (horses: Horse[]) => void;
  setSchedule: (schedule: RaceSchedule[]) => void;
  setCurrentRound: (round: number) => void;
  setRaceFinished: (finished: boolean) => void;
  setRoundResults: (results: RoundResult[]) => void;
};

export type HorsesActions = {
  generateHorses: () => Promise<void>;
  createSchedule: () => Promise<void>;
  resetRaceValues: () => Promise<void>;
  toggleRace: () => Promise<void>;
};
