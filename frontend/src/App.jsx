import './globals.css'

import MainNav from './components/MainNavBar';
import AppRoutes from './AppRoutes';
import { NavRouteList } from './AppRoutes';

import { api } from './api_client/api';
import { useEffect, useState } from 'react';

function App() {
  // dashboard page example
  // https://github.com/shadcn-ui/ui/blob/main/apps/www/app/examples/dashboard/page.tsx
  // use radix react icons
  const [apiHello, setApiHello] = useState("");

  useEffect(() => {
    api.getHello()
      .then(response => {
        setApiHello(response.data)
      })
      .catch(error => {
        console.log(error)
      });
  }, []);

  return (
    <>
      <MainNav navItems={NavRouteList} />
      <p>{import.meta.env.VITE_APP_ENV}</p>
      <p>{JSON.stringify(apiHello)}</p>
      <AppRoutes />
    </>
  )
}

export default App;
