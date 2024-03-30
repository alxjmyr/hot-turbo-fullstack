import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { UserProvider } from './contexts/UserContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>,
)

if ('serviceWorker' in navigator) {
  console.log("trying to register service worker");
  navigator.serviceWorker.register("./serviceworker.js");
}