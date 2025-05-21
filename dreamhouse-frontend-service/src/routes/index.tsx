import { createBrowserRouter } from "react-router-dom";
import { AuthHandler } from "@application/auth/AuthHandler";
import { HomePage } from "@presentation/pages/HomePage";
import { ListingsPage } from "@presentation/pages/ListingPage";
import { UsersPage } from "@presentation/pages/UsersPage";
import { UserFilesPage } from "@presentation/pages/UserFilesPage";
import { Outlet } from "react-router-dom";

export enum AppRoute {
    Index = "/",
    Users = "/users",
    UserFiles = "/user-files",
    Listings = "/listings"
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthHandler><Outlet /></AuthHandler>,
        children: [
            {
                path: AppRoute.Index,
                element: <HomePage />
            },
            {
                path: AppRoute.Listings,
                element: <ListingsPage />
            },
            {
                path: AppRoute.Users,
                element: <UsersPage />
            },
            {
                path: AppRoute.UserFiles,
                element: <UserFilesPage />
            }
        ]
    }
]); 