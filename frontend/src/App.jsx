import './globals.css'

import { Toaster } from './components/ui/toaster';

import MainNav from './components/MainNavBar';
import AppRoutes from './AppRoutes';

import { getBrowser, getDeviceType, getDisplayMode } from './lib/userDevice';
import { useState, useEffect } from 'react';
import { Button } from './components/ui/button';

function App() {
  // dashboard page example
  // https://github.com/shadcn-ui/ui/blob/main/apps/www/app/examples/dashboard/page.tsx
  // use radix react icons

  const [device, setDevice] = useState("");
  const [browser, setBrowser] = useState("");
  const [installPromptEvent, setInstallPromptEvent] = useState(null);
  const [installEligibility, setInstallEligibility] = useState(true);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  // capture and defer PWA instal prompt
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', event => {

    event.preventDefault();

    deferredPrompt = event;

    // store install prompt event for use later
    setInstallPromptEvent(deferredPrompt);
  });

  const handleInstallPrompt = () => {

    if (installPromptEvent) {
      installPromptEvent.prompt();
      installPromptEvent.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          console.log("user accepted install");
        } else {
          console.log("user dismissed the install prompt");
        }
      });
    };

    if (!installPromptEvent && installEligibility) {
      // app can be installed but browser does not supprt any install banner natively
      setShowInstallBanner(true);
    }

  };

  const buildInstallBanner = (device, browser) => {
    if (['iPhone', 'iPad'].includes(device) && browser === "Safari") {
      // return ("This is a apple device in Safari... Click share below and choose add to homepage")
      return (
        <>
          <ol >
            <li>
              Click on the share menu below.
              <img
                src="./images/safari-share-icon.png"
                alt="Safari Share Icon"
                style={{ width: 24, height: 24, marginTop: 10, marginBottom: 0 }}
              />
            </li>
            <li> Scroll down and select Add to Home Page</li>
          </ol >
        </>
      )
    }
    if (device === 'Desktop' && browser === "Safari") {
      return ("Click File >> Add to Dock to install the Relationship Memos App on your device")
    }
    if (browser === "Firefox") {
      return ("This is using Firefox... Please install the firefox PWA extention to install the app, or use a different browser")
    } else {
      return (`Browser: ${browser} || Device: ${device} ||`)
    }

  };

  useEffect(() => {
    const eligibleBrowsers = ['Chrome', 'Edge', 'Safari', 'Firefox'];
    setDevice(getDeviceType());
    setBrowser(getBrowser());

    if (getDisplayMode() === 'browser') {
      if (installPromptEvent) {
        // app is installable... Browser fired the beforeinstallpromopt event
        setInstallEligibility(true);
      } else if (eligibleBrowsers.includes(browser)) {
        // consider app as installable and show install button
        setInstallEligibility(true);
      } else {
        setInstallEligibility(false);
      }
    } else {
      setInstallEligibility(false);
    }


  }, [installPromptEvent, browser])

  return (
    <>
      <MainNav />
      <Button onClick={() => handleInstallPrompt()}>Install App??</Button>
      {showInstallBanner && buildInstallBanner(device, browser)}
      <AppRoutes />
      <Toaster />
    </>
  )
}

export default App;
