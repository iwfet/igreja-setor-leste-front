import {createRootRouteWithContext, Outlet} from '@tanstack/react-router'
import {AuthContextProps} from "@/features/auth";


type RouterContext = {
  authentication: AuthContextProps;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet/>
    </>
  )
})


