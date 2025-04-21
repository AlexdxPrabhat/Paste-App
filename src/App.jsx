import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Paste from './components/Paste'
import ViewPaste from './components/ViewPaste'

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar></Navbar>
        <Home></Home>
      </div>
    ),
  },
  {
    path: "/pastes",
    element: (
      <div>
        <Navbar></Navbar>
        <Paste></Paste>
      </div>
    ),
  },
  {
    path: "/pastes/:id",
    element: (
      <div>
        <Navbar></Navbar>
        <ViewPaste></ViewPaste>
      </div>
    ),
  },
  
]);


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={router}>
    
      </RouterProvider>
    </>
  )
}

export default App
