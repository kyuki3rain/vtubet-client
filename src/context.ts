import { createContext } from "react";
import { ActionType, StateType } from "./reducer";

type ContextType = {
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
};

export const Context = createContext({} as ContextType);