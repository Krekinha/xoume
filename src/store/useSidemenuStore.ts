import { Sidemenu } from './../utils/types';

import { create } from "zustand";

type State = {
  // Props
  sidemenu: Sidemenu;
};

type Actions = {

  setSidemenu: (_sidemenu: Sidemenu) => void;
  updateSidemenu: (_sidemenu: Sidemenu) => void;
};

// define the initial state
const initialState: State = {

  sidemenu: {modulo:"teste"},
};

export const useSidemenuStore = create<State & Actions>()((set, get) => ({
  ...initialState,

  // Actions
  
  setSidemenu: (sidemenu: Sidemenu) => {
    set({
      sidemenu: sidemenu,
    });
  },
  updateSidemenu: (sidemenu: Sidemenu) => {
    set(() => ({
      sidemenu: sidemenu,
    }));
  },
}));
