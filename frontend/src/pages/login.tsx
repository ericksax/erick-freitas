import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";

export const LoginPage = () => {
  return (
  <Card className="w-full max-w-sm">
    <strong className="text-emerald-500 self-end px-8 text-3xl mb-8">Dash.Weather</strong>
      <CardHeader>
        <CardTitle>Faça o login na sua conta</CardTitle>
        <CardDescription>
          Entre com seu email para fazer login na sua conta.
        </CardDescription>
        <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Login
        </Button>

      </CardFooter>
    </Card>
  );
}