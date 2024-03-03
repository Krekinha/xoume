"use client";
import { useRef } from "react";
import { useSidemenuStore } from "./useSidemenuStore";
import { Sidemenu } from "@/utils/types";

interface ISidemenuStore {
  sidemenu: Sidemenu;
}

const InitializerStore = ({ sidemenu }: ISidemenuStore) => {
  const initializer = useRef(false);

  if (!initializer.current) {
    useSidemenuStore.setState({
      sidemenu,
    });
    initializer.current = true;
  }
  return null;
};

export default InitializerStore;
