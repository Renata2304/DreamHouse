import { createBrowserRouter } from "react-router-dom";
import { AuthHandler } from "@application/auth/AuthHandler";
import { HomePage } from "@presentation/pages/HomePage";
import { ListingsPage } from "@presentation/pages/ListingPage";
import { UsersPage } from "@presentation/pages/UsersPage";
import { UserFilesPage } from "@presentation/pages/UserFilesPage";
import { ProfilePage } from "@presentation/pages/ProfilePage";
import { EditProfilePage } from "@presentation/pages/EditProfilePage";
import { AddListingPage } from "@presentation/pages/AddListingPage";
import { EditListingPage } from "@presentation/pages/EditListingPage";
import { Outlet } from "react-router-dom";
import { useOwnUserHasRole } from "@infrastructure/hooks/useOwnUser";
import { UserRoleEnum } from "@infrastructure/apis/client";
import { ListingDetailsPage } from "presentation/pages/ListingDetailsPage";

export enum AppRoute {
    Index = "/",
    Login = "/login",
    Register = "/register",
    Users = "/users",
    UserFiles = "/user-files",
    Listings = "/listings",
    Profile = "/profile",
    EditProfile = "/profile/edit",
    AddListing = "/add-listing",
    EditListing = "/listings/edit/:id"
}

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);
    return isAdmin ? <>{children}</> : null;
};

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
                path: `${AppRoute.Listings}/:id`,
                element: <ListingDetailsPage />
            },
            {
                path: AppRoute.Profile,
                element: <ProfilePage />
            },
            {
                path: AppRoute.EditProfile,
                element: <EditProfilePage />
            },
            {
                path: AppRoute.AddListing,
                element: <AddListingPage />
            },
            {
                path: AppRoute.EditListing,
                element: <EditListingPage />
            },
            {
                path: AppRoute.Users,
                element: <AdminRoute><UsersPage /></AdminRoute>
            },
            {
                path: AppRoute.UserFiles,
                element: <AdminRoute><UserFilesPage /></AdminRoute>
            }
        ]
    }
]); 