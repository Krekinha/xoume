import { transporteService } from "@/services/transporteService";
import { Transporte } from "../utils/types";

import { create } from "zustand";

type State = {
  // Props
  transportes: Transporte[];
  open: boolean;
};

type Actions = {
  getTransportes: () => void;
  setTransportes: (_transportes: Transporte[]) => void;
  addTransporte: (_transporte: Transporte) => void;
  setOpen: (_open: boolean) => void;
};

// define the initial state
const initialState: State = {
  transportes: [],
  open: false,
};

export const useTransporteStore = create<State & Actions>()((set, get) => ({
  ...initialState,

  // Actions

  getTransportes: async () => {
    const data = (await transporteService.get()) as Transporte[];
    console.log(data);

    set({
      transportes: data,
    });
  },
  setTransportes: (_transportes: Transporte[]) => {
    set({
      transportes: _transportes,
    });
  },
  addTransporte: (_transporte: Transporte) => {
    const data = get().transportes;
    data.push(_transporte);
    set({
      transportes: data,
    });
  },
  setOpen: (_open: boolean) => {
    set({
      open: _open,
    });
  },
}));
