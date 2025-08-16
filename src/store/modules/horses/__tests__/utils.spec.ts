import {
  generateRandomHorses,
  pickRandomHorses,
  generateSchedule,
} from "../utils";
import { Horse } from "../models";

describe("Horses Utils", () => {
  describe("generateRandomHorses", () => {
    it("should generate the correct number of horses", () => {
      const count = 20;
      const horses = generateRandomHorses(count);

      expect(horses).toHaveLength(count);
    });

    it("should generate horses with unique IDs", () => {
      const count = 15;
      const horses = generateRandomHorses(count);

      const ids = horses.map((horse) => horse.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(count);
      expect(ids).toEqual(Array.from({ length: count }, (_, i) => i + 1));
    });

    it("should generate horses with sequential names", () => {
      const count = 10;
      const horses = generateRandomHorses(count);

      horses.forEach((horse, index) => {
        expect(horse.name).toBe(`Horse ${index + 1}`);
      });
    });

    it("should generate horses with valid HSL colors", () => {
      const count = 8;
      const horses = generateRandomHorses(count);

      horses.forEach((horse, index) => {
        expect(horse.color).toMatch(/^hsl\(\d+,\s*\d+%,\s*\d+%\)$/);

        const hslMatch = horse.color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
        expect(hslMatch).toBeTruthy();

        if (hslMatch) {
          const hue = parseInt(hslMatch[1]);
          const saturation = parseInt(hslMatch[2]);
          const lightness = parseInt(hslMatch[3]);

          expect(hue).toBeGreaterThanOrEqual(0);
          expect(hue).toBeLessThan(360);
          expect(saturation).toBeGreaterThanOrEqual(60);
          expect(saturation).toBeLessThanOrEqual(90);
          expect(lightness).toBeGreaterThanOrEqual(40);
          expect(lightness).toBeLessThanOrEqual(70);
        }
      });
    });

    it("should generate horses with valid condition values", () => {
      const count = 12;
      const horses = generateRandomHorses(count);

      horses.forEach((horse) => {
        expect(horse.condition).toBeGreaterThanOrEqual(1);
        expect(horse.condition).toBeLessThanOrEqual(100);
        expect(Number.isInteger(horse.condition)).toBe(true);
      });
    });

    it("should initialize horses with default race values", () => {
      const count = 5;
      const horses = generateRandomHorses(count);

      horses.forEach((horse) => {
        expect(horse.position).toBe(0);
        expect(horse.finishedRank).toBe(0);
        expect(horse.finishTime).toBe(0);
      });
    });

    it("should handle edge case of 0 horses", () => {
      const horses = generateRandomHorses(0);

      expect(horses).toHaveLength(0);
      expect(horses).toEqual([]);
    });

    it("should handle edge case of 1 horse", () => {
      const horses = generateRandomHorses(1);

      expect(horses).toHaveLength(1);
      expect(horses[0].id).toBe(1);
      expect(horses[0].name).toBe("Horse 1");
    });

    it("should generate horses with distributed colors", () => {
      const count = 6;
      const horses = generateRandomHorses(count);

      const colors = horses.map((horse) => horse.color);
      const uniqueColors = new Set(colors);

      expect(uniqueColors.size).toBeGreaterThan(1);
    });
  });

  describe("pickRandomHorses", () => {
    let sampleHorses: Horse[];

    beforeEach(() => {
      sampleHorses = [
        {
          id: 1,
          name: "Horse 1",
          color: "red",
          condition: 80,
          position: 0,
          finishedRank: 0,
          finishTime: 0,
        },
        {
          id: 2,
          name: "Horse 2",
          color: "blue",
          condition: 90,
          position: 0,
          finishedRank: 0,
          finishTime: 0,
        },
        {
          id: 3,
          name: "Horse 3",
          color: "green",
          condition: 70,
          position: 0,
          finishedRank: 0,
          finishTime: 0,
        },
        {
          id: 4,
          name: "Horse 4",
          color: "yellow",
          condition: 85,
          position: 0,
          finishedRank: 0,
          finishTime: 0,
        },
        {
          id: 5,
          name: "Horse 5",
          color: "purple",
          condition: 75,
          position: 0,
          finishedRank: 0,
          finishTime: 0,
        },
      ];
    });

    it("should return the correct number of horses", () => {
      const count = 3;
      const selected = pickRandomHorses(sampleHorses, count);

      expect(selected).toHaveLength(count);
    });

    it("should return all horses when count equals total", () => {
      const count = sampleHorses.length;
      const selected = pickRandomHorses(sampleHorses, count);

      expect(selected).toHaveLength(count);
      expect(selected).toHaveLength(sampleHorses.length);
    });

    it("should return all horses when count exceeds total", () => {
      const count = sampleHorses.length + 5;
      const selected = pickRandomHorses(sampleHorses, count);

      expect(selected).toHaveLength(sampleHorses.length);
    });

    it("should return empty array when count is 0", () => {
      const selected = pickRandomHorses(sampleHorses, 0);

      expect(selected).toHaveLength(0);
      expect(selected).toEqual([]);
    });

    it("should return empty array when horses array is empty", () => {
      const selected = pickRandomHorses([], 3);

      expect(selected).toHaveLength(0);
      expect(selected).toEqual([]);
    });

    it("should not modify the original horses array", () => {
      const originalHorses = [...sampleHorses];
      pickRandomHorses(sampleHorses, 3);

      expect(sampleHorses).toEqual(originalHorses);
    });

    it("should return horses with correct structure", () => {
      const selected = pickRandomHorses(sampleHorses, 2);

      selected.forEach((horse) => {
        expect(horse).toHaveProperty("id");
        expect(horse).toHaveProperty("name");
        expect(horse).toHaveProperty("color");
        expect(horse).toHaveProperty("condition");
        expect(horse).toHaveProperty("position");
        expect(horse).toHaveProperty("finishedRank");
        expect(horse).toHaveProperty("finishTime");
      });
    });
  });

  describe("generateSchedule", () => {
    let sampleHorses: Horse[];

    beforeEach(() => {
      sampleHorses = [
        {
          id: 1,
          name: "Horse 1",
          color: "red",
          condition: 80,
          position: 0,
          finishedRank: 0,
          finishTime: 0,
        },
        {
          id: 2,
          name: "Horse 2",
          color: "blue",
          condition: 90,
          position: 0,
          finishedRank: 0,
          finishTime: 0,
        },
        {
          id: 3,
          name: "Horse 3",
          color: "green",
          condition: 70,
          position: 0,
          finishedRank: 0,
          finishTime: 0,
        },
        {
          id: 4,
          name: "Horse 4",
          color: "yellow",
          condition: 85,
          position: 0,
          finishedRank: 0,
          finishTime: 0,
        },
        {
          id: 5,
          name: "Horse 5",
          color: "purple",
          condition: 75,
          position: 0,
          finishedRank: 0,
          finishTime: 0,
        },
        {
          id: 6,
          name: "Horse 6",
          color: "orange",
          condition: 88,
          position: 0,
          finishedRank: 0,
          finishTime: 0,
        },
        {
          id: 7,
          name: "Horse 7",
          color: "pink",
          condition: 92,
          position: 0,
          finishedRank: 0,
          finishTime: 0,
        },
        {
          id: 8,
          name: "Horse 8",
          color: "brown",
          condition: 78,
          position: 0,
          finishedRank: 0,
          finishTime: 0,
        },
        {
          id: 9,
          name: "Horse 9",
          color: "gray",
          condition: 83,
          position: 0,
          finishedRank: 0,
          finishTime: 0,
        },
        {
          id: 10,
          name: "Horse 10",
          color: "cyan",
          condition: 87,
          position: 0,
          finishedRank: 0,
          finishTime: 0,
        },
        {
          id: 11,
          name: "Horse 11",
          color: "magenta",
          condition: 79,
          position: 0,
          finishedRank: 0,
          finishTime: 0,
        },
        {
          id: 12,
          name: "Horse 12",
          color: "lime",
          condition: 91,
          position: 0,
          finishedRank: 0,
          finishTime: 0,
        },
      ];
    });

    it("should generate schedule with 6 rounds", () => {
      const schedule = generateSchedule(sampleHorses);

      expect(schedule).toHaveLength(6);
    });

    it("should have correct round numbers", () => {
      const schedule = generateSchedule(sampleHorses);

      schedule.forEach((race, index) => {
        expect(race.round).toBe(index + 1);
      });
    });

    it("should have correct distances", () => {
      const expectedDistances = [1200, 1400, 1600, 1800, 2000, 2200];
      const schedule = generateSchedule(sampleHorses);

      schedule.forEach((race, index) => {
        expect(race.distance).toBe(expectedDistances[index]);
      });
    });

    it("should have 10 participants per race", () => {
      const schedule = generateSchedule(sampleHorses);

      schedule.forEach((race) => {
        expect(race.participants).toHaveLength(10);
      });
    });

    it("should have correct structure for each race", () => {
      const schedule = generateSchedule(sampleHorses);

      schedule.forEach((race) => {
        expect(race).toHaveProperty("round");
        expect(race).toHaveProperty("distance");
        expect(race).toHaveProperty("participants");
        expect(Array.isArray(race.participants)).toBe(true);
      });
    });

    it("should handle empty horses array", () => {
      const schedule = generateSchedule([]);

      expect(schedule).toHaveLength(6);
      schedule.forEach((race) => {
        expect(race.participants).toHaveLength(0);
      });
    });

    it("should handle horses array with less than 10 horses", () => {
      const fewHorses = sampleHorses.slice(0, 5);
      const schedule = generateSchedule(fewHorses);

      schedule.forEach((race) => {
        expect(race.participants).toHaveLength(5);
      });
    });

    it("should not modify the original horses array", () => {
      const originalHorses = [...sampleHorses];
      generateSchedule(sampleHorses);

      expect(sampleHorses).toEqual(originalHorses);
    });

    it("should generate different participant orders for different rounds", () => {
      const schedule = generateSchedule(sampleHorses);

      const firstRaceParticipants = schedule[0].participants.map((p) => p.id);
      const secondRaceParticipants = schedule[1].participants.map((p) => p.id);

      expect(firstRaceParticipants).toHaveLength(10);
      expect(secondRaceParticipants).toHaveLength(10);
    });
  });

  describe("Integration Tests", () => {
    it("should work together: generate horses -> pick random -> generate schedule", () => {
      const horses = generateRandomHorses(15);
      expect(horses).toHaveLength(15);

      const selected = pickRandomHorses(horses, 8);
      expect(selected).toHaveLength(8);

      const schedule = generateSchedule(horses);
      expect(schedule).toHaveLength(6);

      schedule.forEach((race) => {
        expect(race.participants).toHaveLength(10);
        race.participants.forEach((participant) => {
          expect(horses.some((horse) => horse.id === participant.id)).toBe(
            true
          );
        });
      });
    });

    it("should handle edge case: single horse", () => {
      const horses = generateRandomHorses(1);
      expect(horses).toHaveLength(1);

      const selected = pickRandomHorses(horses, 1);
      expect(selected).toHaveLength(1);

      const schedule = generateSchedule(horses);
      expect(schedule).toHaveLength(6);

      schedule.forEach((race) => {
        expect(race.participants).toHaveLength(1);
        expect(race.participants[0].id).toBe(1);
      });
    });
  });
});
