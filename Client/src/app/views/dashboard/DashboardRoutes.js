

import Listusers from "./user/Listusers";
import Profiluser from "./user/Profiluser";
import Product from "./Prouduct/product";
import Event from "./event/event";
import Tools from "./tools/tools";
import Actuality from "./Actuality/actuality";
import Admin from "./admin/admin";
import Eventsdone from "./event/eventsdone";
import Analytics from "./Analytics";
const dashboardRoutes = [
  { path: '/dashboard', element: <Analytics /> },
  { path: '/dashboard/admin', element: <Admin />    },
  { path: '/dashboard/actuality', element: <Actuality/>},
  { path: '/dashboard/listusers', element: <Listusers />},
  { path: '/dashboard/profil', element: <Profiluser />},
  { path: '/dashboard/event', element: <Event />},
  { path: '/dashboard/eventsdone', element: <Eventsdone />},
  { path: '/dashboard/product', element: <Product />},
  { path: '/dashboard/tools', element: <Tools />},
];

export default dashboardRoutes;
