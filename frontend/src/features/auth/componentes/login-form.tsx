"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "../../../components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form"
import { Input } from "../../../components/ui/input"
import { CardFooter } from "../../../components/ui/card"
import { useAuth } from "../../../contexts/auth"

import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { AxiosError } from "axios"
import { AuthRequest } from "../types/auth"

const loginFormSchema = z.object({
  email: z.email({
    message: "Por favor insira um email válido.",
  }),
  password: z.string().min(6, {
    message: "A Senha deve ter no mínimo 6 caracteres",
  }),
})

export function LoginForm() {
  const { login } = useAuth()
  const navigate = useNavigate()
  
  const form = useForm<AuthRequest>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: AuthRequest) {
    try {
      await login({ email: values.email, password: values.password })
    
      toast.success("Login realizado com sucesso!")
      
      form.reset()

      navigate("/dashboard")
    } catch (error) {
      if(error instanceof AxiosError && error.response?.status === 401){
        toast.error("Credenciais inválidas")
        return
      }

      if(error instanceof AxiosError && error.response?.status === 404) {
        toast.error("Usuário não existe")
        return
      }
      toast.error("Ocorreu um erro ao fazer login, verifique suas credenciais.")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            Login
          </Button>
        </CardFooter>
      </form>
    </Form>
  )
}
