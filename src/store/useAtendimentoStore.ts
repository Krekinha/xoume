
import { Atendimento } from "../utils/types";

import { create } from "zustand";

type State = {
  // Props
  atendimentos: Atendimento[];
};

type Actions = {
  setAtendimentos: (_atendimentos: Atendimento[]) => void;
};

// define the initial state
const initialState: State = {
  atendimentos: [],
};

export const useAtendimentoStore = create<State & Actions>()((set, get) => ({
  ...initialState,

  // Actions

  setAtendimentos: (_atendimentos: Atendimento[]) => {
    set({
      atendimentos: _atendimentos,
    });
  },
}));
