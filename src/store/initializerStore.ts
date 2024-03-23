"use client";
import { useRef } from "react";
import { Atendimento} from "@/utils/types";
import { useAtendimentoStore } from "./useAtendimentoStore";

interface IAtendimentoStore {
  atendimentos: Atendimento[];
}

const InitializerStore = ({ atendimentos }: IAtendimentoStore) => {
  const initializer = useRef(false);

  if (!initializer.current) {
    useAtendimentoStore.setState({
      atendimentos,
    });
    initializer.current = true;
  }
  return null;
};

export default InitializerStore;
