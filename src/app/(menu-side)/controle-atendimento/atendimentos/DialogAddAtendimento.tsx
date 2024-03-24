"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GrAdd } from "react-icons/gr";
import { FormAddAtendimento } from "./FormAddAtendimento";
import { useState } from "react";
import { useAtendimentoStore } from "@/store/useAtendimentoStore";

export function DialogAddAtendimento() {
  const {open, setOpen} = useAtendimentoStore();
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="button-add rounded-full p-1 bg-green-600 text-white hover:bg-green-700 active:bg-green-800
        shadow-md hover:shadow-lg focus:shadow-lg ease-linear transition-all 
        cursor-pointer duration-150 select-none "
        >
          <GrAdd className="h-4 w-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Adicionar atendimento</DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
        <FormAddAtendimento/>
      </DialogContent>
    </Dialog>
  );
}
