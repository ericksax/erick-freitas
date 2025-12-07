import { z } from "zod";

const loginFormSchema = z.object({
  email: z.email({
    message: "Por favor insira um email válido.",
  }),
  password: z.string().min(6, {
    message: "A Senha deve ter no mínimo 6 caracteres",
  }),
});

const signInFormSchema = z.object({
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

type CreateUserRequest = z.infer<typeof signInFormSchema>;

interface User {
  _id: string;
  name: string;
  email: string;
}

interface CreateUserResponse {
  access_token: string;
  refresh_token: string;
  user: {
    email: string;
    name: string;
    id: string;
  };
}

interface ApiErrorResponse {
  statusCode: number;
  message: string | string[];
  error: string;
}

type AuthRequest = z.infer<typeof loginFormSchema>;
type SignInRequest = z.infer<typeof signInFormSchema>;

export {
  type AuthRequest,
  type User,
  type CreateUserResponse,
  type CreateUserRequest,
  type SignInRequest,
  type ApiErrorResponse,
  loginFormSchema,
  signInFormSchema,
};
