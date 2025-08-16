import { Horse, RaceParticipant, RaceSchedule } from "./models";

export function generateRandomHorses(count: number): Horse[] {
  return Array.from({ length: count }, (_, i) => {
    const hue = (i * (360 / count)) % 360;
    const saturation = 60 + (i % 3) * 15;
    const lightness = 40 + (i % 4) * 10;

    return {
      id: i + 1,
      name: `Horse ${i + 1}`,
      color: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
      condition: Math.floor(Math.random() * 100) + 1,
      position: 0,
      finishedRank: 0,
      finishTime: 0,
    };
  });
}

export function pickRandomHorses(
  allHorses: Horse[],
  count: number
): RaceParticipant[] {
  const shuffled = allHorses.slice().sort(() => Math.random() - 0.5);
  // .map((item) => ({
  //   ...item,
  //   position: 0,
  //   finishedRank: 0,
  //   finishTime: 0,
  // }));
  return shuffled.slice(0, count);
}

export function generateSchedule(horses: Horse[]): RaceSchedule[] {
  const distances = [1200, 1400, 1600, 1800, 2000, 2200];
  return distances.map((distance, roundIndex) => ({
    round: roundIndex + 1,
    distance,
    participants: pickRandomHorses(horses, 10),
  }));
}
