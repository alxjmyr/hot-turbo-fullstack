import './globals.css'
import { useContext, useEffect, useState } from 'react';

import { Toaster } from './components/ui/toaster';

import MainNav from './components/MainNavBar';
import AppRoutes from './AppRoutes';
import { NavRouteList } from './AppRoutes';

import { api } from './api_client/api';
import { UserContext } from './contexts/UserContext';

function App() {
  // dashboard page example
  // https://github.com/shadcn-ui/ui/blob/main/apps/www/app/examples/dashboard/page.tsx
  // use radix react icons

  const { userProfile } = useContext(UserContext);

  return (
    <>
      <MainNav navItems={NavRouteList} />
      <p>{JSON.stringify(userProfile)}</p>
      <AppRoutes />
      <Toaster />
    </>
  )
}

export default App;
