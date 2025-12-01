"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "../components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form"
import { Input } from "../components/ui/input"
import { CardFooter } from "./ui/card"
import { useAuth } from "../contexts/auth"

import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { AxiosError } from "axios"

const formSchema = z.object({
  email: z.email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 8 characters.",
  }),
})

export function LoginForm() {
  const { login } = useAuth()
  const navigate = useNavigate()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
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
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
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
            Login
          </Button>
        </CardFooter>
      </form>
    </Form>
  )
}
