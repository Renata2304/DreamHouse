import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "@presentation/pages/LoginPage";
import { RegisterPage } from "@presentation/pages/RegisterPage";
import { AuthHandler } from "@application/auth/AuthHandler";

export enum AppRoute {
    Login = "/login",
    Register = "/register"
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthHandler />,
        children: [
            {
                path: AppRoute.Login,
                element: <LoginPage />
            },
            {
                path: AppRoute.Register,
                element: <RegisterPage />
            }
        ]
    }
]); 