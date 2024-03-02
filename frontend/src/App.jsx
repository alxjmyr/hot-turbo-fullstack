import './globals.css'
import { useContext } from 'react';

import { Toaster } from './components/ui/toaster';

import MainNav from './components/MainNavBar';
import AppRoutes from './AppRoutes';

import { UserContext } from './contexts/UserContext';

function App() {
  // dashboard page example
  // https://github.com/shadcn-ui/ui/blob/main/apps/www/app/examples/dashboard/page.tsx
  // use radix react icons

  const { userProfile } = useContext(UserContext);

  return (
    <>
      <MainNav />
      <AppRoutes />
      <Toaster />
    </>
  )
}

export default App;
