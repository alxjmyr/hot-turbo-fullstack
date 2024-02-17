import './globals.css'

import MainNav from './components/MainNavBar';
import AppRoutes from './AppRoutes';
import { NavRouteList } from './AppRoutes';

function App() {
  // dashboard page example
  // https://github.com/shadcn-ui/ui/blob/main/apps/www/app/examples/dashboard/page.tsx
  // use radix react icons

  return (
    <>
      <MainNav navItems={NavRouteList} />
      <AppRoutes />
    </>
  )
}

export default App;
