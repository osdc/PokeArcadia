import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from './layout/RootLayout';
import Home from "./components/home/Home";
import Test from "./components/test/Test";
import Canvas from "./components/home/Canvas";
const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,

    // errorElement: <ErrorPage />,
    
    
    children:[
      { index: true, Component: Home },
      { path: "/test", Component: Test },
      { path: "/canvas", Component: Canvas} 
      
      
    ],
  },

  
]);

export default function App() {
  return <RouterProvider router={router} />;
}