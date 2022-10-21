
import JwtLogin from "./JwtLogin";
import NotFound from "./NotFound";

const sessionRoutes = [
  { path: '*', element: <JwtLogin /> },
  { path: '404', element: <NotFound /> },


];

export default sessionRoutes;
