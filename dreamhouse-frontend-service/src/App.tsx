import { UserRoleEnum } from "@infrastructure/apis/client";
import { useOwnUserHasRole } from "@infrastructure/hooks/useOwnUser";
import { AppIntlProvider } from "@presentation/components/ui/AppIntlProvider";
import { ToastNotifier } from "@presentation/components/ui/ToastNotifier";
import { router } from "routes/index";
import { RouterProvider } from "react-router-dom";

export function App() {
  return (
    <AppIntlProvider>
      <ToastNotifier />
      <RouterProvider router={router} />
    </AppIntlProvider>
  );
}
