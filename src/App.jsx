// App.js
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Paste from './components/Paste';
import ViewPaste from './components/ViewPaste';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4">
        <Outlet />
      </main>
    </div>
  );
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/pastes",
        element: <Paste />,
      },
      {
        path: "/pastes/:id",
        element: <ViewPaste />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;