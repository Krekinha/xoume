import { Atendimento } from "../utils/types";

import { create } from "zustand";

type State = {
  // Props
  atendimentos: Atendimento[];
  open: boolean;
};

type Actions = {
  setAtendimentos: (_atendimentos: Atendimento[]) => void;
  addAtendimento: (_atendimento: Atendimento) => void;
  setOpen: (_open: boolean) => void;
};

// define the initial state
const initialState: State = {
  atendimentos: [],
  open: false,
};

export const useAtendimentoStore = create<State & Actions>()((set, get) => ({
  ...initialState,

  // Actions

  setAtendimentos: (_atendimentos: Atendimento[]) => {
    set({
      atendimentos: _atendimentos,
    });
  },
  addAtendimento: (_atendimento: Atendimento) => {
    const data = get().atendimentos;
    data.push(_atendimento);
    set({
      atendimentos: data,
    });
  },
  setOpen: (_open: boolean) => {
    set({
      open: _open,
    });
  },
}));
