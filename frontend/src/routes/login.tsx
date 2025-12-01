import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { LoginForm } from "../components/login-form"
import { Link } from "@tanstack/react-router"

export function LoginPage() {
  return (
    <main className="flex flex-col w-full items-center gap-16">
      <div className="text-emerald-500 font-bold text-3xl">
        Dash.Weather
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Faça o login na sua conta</CardTitle>
          <CardDescription>
            Entre com seu email para fazer login na sua conta.
          </CardDescription>
          <CardAction>
            <Link to="/sign-in" className="underline font-bold">Sign Up</Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  )
}