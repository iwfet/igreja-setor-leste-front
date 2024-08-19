import {createFileRoute, Outlet, redirect} from '@tanstack/react-router'
import {removeToken} from "@/utils";


export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({context}) => {
    const {checkAuthStatus} = context.authentication
    if (!checkAuthStatus()) {
      removeToken()
      throw redirect({
        to: '/login',
      })
    }
  },
  component: AuthLayout,
})

export function AuthLayout() {
  return (
    <div className="flex flex-col">
      {/*<Navbar/>*/}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet/>
      </main>
    </div>
  );
}



