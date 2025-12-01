import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { SignInForm } from "../components/sign-in-form"
import { Link } from "react-router-dom"

export function SignIn() {
  return (
    <main className="flex flex-col w-full items-center gap-16 h-screen pt-24">
      <div className="text-emerald-500 font-bold text-3xl">
        Dash.Weather
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Faça seu cadastro</CardTitle>
          <CardDescription>
            Digite seus dados para criar sua conta.
          </CardDescription>
            <CardAction>
                <Link to="/login" className="underline font-bold">Voltar</Link>
            </CardAction>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
    </main>
  )
}