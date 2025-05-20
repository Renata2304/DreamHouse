import { UserRoleEnum } from "@infrastructure/apis/client";
import { useOwnUserHasRole } from "@infrastructure/hooks/useOwnUser";
import { AppIntlProvider } from "@presentation/components/ui/AppIntlProvider";
import { ToastNotifier } from "@presentation/components/ui/ToastNotifier";
import { HomePage } from "@presentation/pages/HomePage";
import { UserFilesPage } from "@presentation/pages/UserFilesPage";
import { UsersPage } from "@presentation/pages/UsersPage";
import { Route, Routes, RouterProvider } from "react-router-dom";
import { AppRoute } from "routes";
import { createBrowserRouter } from "react-router-dom";
import { ListingsPage } from "@presentation/pages/ListingPage";

export function App() {
  const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />
    },
    {
      path: "/listings",
      element: <ListingsPage />
    },
    {
      path: AppRoute.Users,
      element: isAdmin ? <UsersPage /> : null
    },
    {
      path: AppRoute.UserFiles,
      element: <UserFilesPage />
    }
  ]);

  return <AppIntlProvider> {/* AppIntlProvider provides the functions to search the text after the provides string ids. */}
      <ToastNotifier />
      <RouterProvider router={router} />
    </AppIntlProvider>
}
