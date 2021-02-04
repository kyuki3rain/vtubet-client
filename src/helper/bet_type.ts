export const BET_TYPE = {
  win: "win",
  place: "place",
  exacta: "exacta",
  quinella: "quinella",
  quinella_place: "quinella_place",
  tierce: "tierce",
  trio: "trio"
} as const;

export const BET_TYPE_JA = [
  "単勝", "複勝", "馬単", "馬連", "ワイド", "三連単", "三連複"
]

export type BetType = typeof BET_TYPE[keyof typeof BET_TYPE];

export const bet_type = Object.values(BET_TYPE);

export const bet_type_index = (a: BetType): number => {
  return bet_type.findIndex(item => item === a)
};

export const bet_type_length = (a: BetType): number => {
  if(a === "win" || a === "place"){
    return 1;
  }
  if(a === "exacta" || a === "quinella" || a === "quinella_place"){
    return 2;
  }
  if(a === "tierce" || a === "trio"){
    return 3;
  }

  return 0;
}
