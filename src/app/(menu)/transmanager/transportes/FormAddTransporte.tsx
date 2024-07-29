"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogClose } from "@radix-ui/react-dialog";
import { transporteService } from "@/services/transporteService";
import { useTransporteStore } from "@/store/useTransporteStore";

const formSchema = z.object({
  motorista: z
    .string()
    .min(2, { message: "Este campo precisa ter no mínimo 2 caracteres" })
    .max(50),
});

export function FormAddTransporte() {
  const {
    setOpen,
    getTransportes,
  } = useTransporteStore();

  // 1. Define o formulário
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      motorista: "",
    },
  });

  // 2. Define a o evento submit
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await transporteService.add(values);
      getTransportes();
      setOpen(false)
    } catch (error) {
      console.error("Erro ao adicionar o transporte:", error);
      // Aqui eu posso adicionar um tratamento de erro, como por exemplo mostrar uma mensagem de erro na interface do usuário.
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="motorista"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transporte</FormLabel>
              <FormControl>
                <Input
                  className="border-gray-300"
                  placeholder="Transporte"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-600 ml-1 text-xs" />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-green-700 text-white">
          Salvar
        </Button>

        <DialogClose asChild>
          <Button
            type="button"
            variant="destructive"
            className="bg-red-600 text-white ml-2"
          >
            Cancelar
          </Button>
        </DialogClose>
      </form>
    </Form>
  );
}
