
import { useRoutes } from 'react-router-dom';
import { MatxTheme } from './components';
import { AuthProvider } from './contexts/JWTAuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import routes from './routes';
import React, {useEffect} from "react";
import axios from "../axios";

const App = () => {
    useEffect(() => {
        const data = axios.get("http://localhost:8762/event-service/event/findAll");
        console.log(data)
    },[])
  const content = useRoutes(routes);

  return (

      <SettingsProvider>
        <MatxTheme>
          <AuthProvider>{content}</AuthProvider>
        </MatxTheme>
      </SettingsProvider>

  );
};

export default App;
