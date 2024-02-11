import './globals.css'
import { PersonIcon } from '@radix-ui/react-icons'

import { Button } from "@/components/ui/button"

import { ThemeProvider } from './contexts/ThemeContext'
import ThemeToggle from './components/ThemeMenu'

function App() {
  // dashboard page example
  // https://github.com/shadcn-ui/ui/blob/main/apps/www/app/examples/dashboard/page.tsx
  // use radix react icons

  return (
    <ThemeProvider>
      <>
        <div className="border-b">
          <nav
            className={"flex place-items-center justify-between p"}
          >
            <h1 className="text-5xl pl-3">My Navbar</h1>
            <div className="pr-3">
              <ThemeToggle />
            </div>

          </nav>
        </div>

        <div className="grid place-items-center h-screen">
          <Button
            size="lg"
            variant="outline"
            onClick={() => console.log("Clicking the Button")}
          >
            Click me
            <PersonIcon />
          </Button>
        </div>
      </>
    </ThemeProvider>
  )
}

export default App
