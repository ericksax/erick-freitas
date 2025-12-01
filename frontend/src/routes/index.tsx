import { createRootRoute, createRoute, createRouter, redirect } from "@tanstack/react-router";
import App from "../App";
import { DashboardPage } from "./dashboard";
import { LoginPage } from "./login";
import { SignInPage } from "./sign-in";

const rootRoute = createRootRoute({
  component: App,
});

const indexRedirectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({ to: "/login" });
  },
});

// Rotas normais
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const SignInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sign-in",
  component: SignInPage,
});

// Rota protegida usando beforeLoad
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardPage,
  beforeLoad: () => {
    const isAuth = localStorage.getItem("token");
    if (!isAuth) {
      throw redirect({ to: "/login" });
    }
  },
});

const routeTree = rootRoute.addChildren([
  indexRedirectRoute,
  loginRoute,
  SignInRoute,
  dashboardRoute,
]);

export const router = createRouter({ routeTree });

// Para TypeScript:
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
