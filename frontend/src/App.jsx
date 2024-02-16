import './globals.css'

import { useTheme } from './contexts/ThemeContext'
import MainNav from './components/MainNavBar';

function App() {
  // dashboard page example
  // https://github.com/shadcn-ui/ui/blob/main/apps/www/app/examples/dashboard/page.tsx
  // use radix react icons
  const { theme } = useTheme();

  const menuItems = [
    { title: "Google Link", path: "https://google.com" },
    { title: "Target Link", path: "https://target.com" },
    { title: "Spotify Link", path: "https://spotify.com" }
  ]

  return (
    <>
      <MainNav navItems={menuItems} />

      <div className="grid place-items-center h-screen">

        {theme === 'light' ? (
          <img
            src="turbo-sketch.svg"
            alt="Turbo Charger"
            width="250px"
            height="250px"
          />
        ) : (
          <img
            src="turbo-sketch-white.svg"
            alt="Turbo Charger"
            width="250px"
            height="250px"
          />
        )}
      </div>
    </>
  )
}

export default App
