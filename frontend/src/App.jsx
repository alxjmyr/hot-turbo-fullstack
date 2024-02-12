import './globals.css'

import { Button } from "@/components/ui/button"

// import { ThemeProvider } from './contexts/ThemeContext'
import ThemeToggle from './components/ThemeMenu'
import { useTheme } from './contexts/ThemeContext'
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

function App() {
  // dashboard page example
  // https://github.com/shadcn-ui/ui/blob/main/apps/www/app/examples/dashboard/page.tsx
  // use radix react icons
  const { theme } = useTheme();
  // console.log(theme);
  const [navState, setNavState] = useState(false);

  const menuItems = [
    { title: "Google Link", path: "https://google.com" },
    { title: "Target Link", path: "https://target.com" },
    { title: "Spotify Link", path: "https://spotify.com" }
  ]

  return (
    // <ThemeProvider>
    <>
      <nav
        className="border-b w-full"
      >
        <div className="items-center justify-between px-1 max-w-screen-xl mx-auto md:flex md:px-8">
          <div className="flex items-center justify-between md:block">
            {theme === 'light' ? (
              <img
                src="turbo-sketch.svg"
                alt="Turbo Charger"
                width="85px"
                height="85px"
              />
            ) : (
              <img
                src="turbo-sketch-white.svg"
                alt="Turbo Charger"
                width="85px"
                height="85px"
              />
            )}
            <div className="md:hidden">
              <Button variant="outline" onClick={() => setNavState(!navState)}>
                <HamburgerMenuIcon />
              </Button>
            </div>
          </div>

          <div
            className={`pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navState ? "block" : "hidden"
              }`}
          >
            {menuItems.map((item, idx) => (
              <Button variant="ghost">
                <a href={item.path}>{item.title}</a>
              </Button>
            ))}
            {/* <ThemeToggle /> */}
          </div>
          <div className={`md:block md:pb-0 md:mt-0 ${navState ? "block" : "hidden"
            }`}>
            <ThemeToggle />
          </div>
        </div>


      </nav>

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
    // </ThemeProvider>
  )
}

export default App
