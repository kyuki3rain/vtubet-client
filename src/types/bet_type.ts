export const BET_TYPE = {
  win: "win",
  place: "place",
  exacta: "exacta",
  quinella: "quinella",
  quinella_place: "quinella_place",
  tierce: "tierce",
  trio: "trio"
} as const;

export type BetType = typeof BET_TYPE[keyof typeof BET_TYPE];

export const bet_type = Object.values(BET_TYPE);

export const bet_type_index = (a: BetType): number => {
  return bet_type.findIndex(item => item === a)
};