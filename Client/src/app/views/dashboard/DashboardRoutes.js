import Loadable from "app/components/Loadable";
import { lazy } from "react";
import { authRoles } from "../../auth/authRoles";
import ListEmployee from "./employee/ListEmployee";

import ListEvent from "./event/ListEvent";

import Listusers from "./user/Listusers";
import Profiluser from "./user/Profiluser";

const Analytics = Loadable(lazy(() => import("./Analytics")));

const dashboardRoutes = [
  { path: "/dashboard", element: <Analytics />, auth: authRoles.admin },
  {
    path: "/dashboard/listusers",
    element: <Listusers />,
    auth: authRoles.admin,
  },
  { path: "/dashboard/profil", element: <Profiluser />, auth: authRoles.admin },
  {
    path: "/dashboard/employees",
    element: <ListEmployee />,
    auth: authRoles.admin,
  },

  {
    path: "/dashboard/events",
    element: <ListEvent/>,
    auth: authRoles.admin,
  },


];

export default dashboardRoutes;
