import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { toast } from "sonner";
import { isAxiosError } from "axios";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/auth";
import { CardFooter } from "@/components/ui/card";
import { api } from "@/lib/axios";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateUserRequest, CreateUserResponse, signInFormSchema, SignInRequest } from "../types/auth";


const createUser = async (newUserData: CreateUserRequest) => {
  const { data } = await api.post<CreateUserResponse>("auth/register", newUserData);
  return data;
};

export function SignInForm() {
  const { login } = useAuth();
  const queryClient = useQueryClient();

  const form = useForm<SignInRequest>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: createUser,
    onSuccess: (_data, variables) => {
      login({ email: variables.email, password: variables.password });
      form.reset();
      toast.success("Cadastro realizado com sucesso!");
      // Invalida a query 'users' para que a lista seja atualizada
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response?.status === 409) {
        toast.error("Usuário já cadastrado!");
        return;
      }
      toast.error("Erro ao cadastrar usuário!");
      console.error(error);
    },
  });

  async function onSubmit(values: CreateUserRequest) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Seu nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="m@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel>Password</FormLabel>
              </div>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <CardFooter>
          <Button type="submit" className="w-full bg-emerald-500 hover:cursor-pointer hover:bg-emerald-600">
            Cadastrar
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
