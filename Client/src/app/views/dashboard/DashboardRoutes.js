import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';
import Listusers from "./user/Listusers";
import Profiluser from "./user/Profiluser";

const Analytics = Loadable(lazy(() => import('./Analytics')));

const dashboardRoutes = [
  { path: '/dashboard', element: <Analytics />, auth: authRoles.admin },
  { path: '/dashboard/listusers', element: <Listusers />, auth: authRoles.admin },
  { path: '/dashboard/profil', element: <Profiluser />, auth: authRoles.admin },
];

export default dashboardRoutes;
