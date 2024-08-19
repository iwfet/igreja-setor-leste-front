import {createRouter, RouterProvider} from "@tanstack/react-router";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import {routeTree} from "@/routeTree.gen.ts";
import {I18nProvider} from "@/features/i18n";
import {LoadingGlobal, LoadingProvider} from "@/features/Loading";
import {AuthProvider, useAuth} from "@/features/auth";



const appRouter = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: { authentication: undefined! },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof appRouter;
  }
}

const AppRouter = () => {
  const authentication = useAuth()
  return <RouterProvider router={appRouter} context={{authentication}}/>
};


export function App() {

  return (
    <I18nProvider>
      <LoadingProvider>
        <AuthProvider>
          <LoadingGlobal>
            <AppRouter/>
            <ToastContainer
              position="bottom-left"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </LoadingGlobal>
        </AuthProvider>
      </LoadingProvider>
    </I18nProvider>
  )
}


