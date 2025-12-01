"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { CardFooter } from "./ui/card";
import { api } from "../lib/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";

const formSchema = z.object({
  email: z.email({
    message: "Please enter a valid email.",
  }),
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

type CreateUserRequest = z.infer<typeof formSchema>;

interface CreateUserResponse {
  access_token: string;
  refresh_token: string;
  user: {
    email: string;
    name: string;
    id: string;
  };
}

export interface ApiErrorResponse {
  statusCode: number;
  message: string | string[];
  error: string;
}

export function SignInForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  async function onSubmit(values: CreateUserRequest) {
    try {
      const result = await api.post<CreateUserResponse>(
        "auth/register",
        values
      );

      localStorage.setItem("dashweather@token", result.data.access_token);
      localStorage.setItem(
        "dashweather@refreshToken",
        result.data.refresh_token
      );
      localStorage.setItem(
        "dashweather@user",
        JSON.stringify(result.data.user)
      );

      form.reset();
      toast.success("Cadastro realizado com sucesso!");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          toast.error("Usuário já cadastrado!");
          return;
        }

      
        toast.error("Error ao cadastrar usuário!");
      }
      toast.error("Error ao cadastrar usuário!");
      console.log(error);
    }
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
          <Button type="submit" className="w-full">
            Cadastrar
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
