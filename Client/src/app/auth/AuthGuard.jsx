
import { Navigate, useLocation } from 'react-router-dom';
import cookie from "js-cookie";


const AuthGuard = ({ children }) => {
  const { pathname } = useLocation();
 let isAuthenticated = cookie.get("jwt")
  let authenticated = true;




    return (
    <>
      {authenticated ? (
        children
      ) : (
        <Navigate replace to="*" state={{ from: pathname }} />
      )}
    </>
  );
};

export default AuthGuard;
