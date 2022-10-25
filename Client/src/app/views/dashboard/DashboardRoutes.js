import Loadable from "app/components/Loadable";
import { lazy } from "react";
import { authRoles } from "../../auth/authRoles";
import ListDepratments from "./departments/ListDepartments";
import ListEmployee from "./employee/ListEmployee";
import ListJobs from "./jobs/ListJobs";
import ListCandidacy from "./jobs/ListCandidacy";
import ListEvent from "./event/ListEvent";
import ListLeave from "./leave/ListLeave";
import ListSalary from "./salary/ListSalary";

import Listusers from "./user/Listusers";
import Profiluser from "./user/Profiluser";
import ListEntretien from "./entretien/ListEntretien";

const Analytics = Loadable(lazy(() => import("./Analytics")));

const dashboardRoutes = [
  { path: "/dashboard", element: <Analytics />, auth: authRoles.admin },
  {
    path: "/dashboard/listusers",
    element: <Listusers />,
    auth: authRoles.admin,
  },
  { path: "/dashboard/roles", element: <Profiluser />, auth: authRoles.admin },
  {
    path: "/dashboard/employees",
    element: <ListEmployee />,
    auth: authRoles.admin,
  },
  {
    path: "/dashboard/entretien",
    element: <ListEntretien />,
    auth: authRoles.admin,
  },
  {
    path: "/dashboard/jobs",
    element: <ListJobs />,
    auth: authRoles.admin,
  },
  {
    path: "/dashboard/jobs/candidacies",
    element: <ListCandidacy />,
    auth: authRoles.admin,
  },
  {
    path: "/dashboard/departments",
    element: <ListDepratments />,
    auth: authRoles.admin,
  },
  {
    path: "/dashboard/salary",
    element: <ListSalary />,
    auth: authRoles.admin,
  },
  {
    path: "/dashboard/leave",
    element: <ListLeave />,
    auth: authRoles.admin,
  },
  {
    path: "/dashboard/events",
    element: <ListEvent />,
    auth: authRoles.admin,
  },
];

export default dashboardRoutes;
