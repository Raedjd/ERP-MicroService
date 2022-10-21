import Loadable from "app/components/Loadable";
import { lazy } from "react";
import { authRoles } from "../../auth/authRoles";
import ListEmployee from "./employee/ListEmployee";
<<<<<<< HEAD
import ListEvent from "./event/ListEvent";
=======
>>>>>>> 4a9d919c84f696a141c41f7a1a35f00ab1495058
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
<<<<<<< HEAD
  {
    path: "/dashboard/events",
    element: <ListEvent/>,
    auth: authRoles.admin,
  },

=======
>>>>>>> 4a9d919c84f696a141c41f7a1a35f00ab1495058
];

export default dashboardRoutes;
