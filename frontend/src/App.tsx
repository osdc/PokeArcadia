import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "./components/home/Home";
import Test from "./components/test/Test";
import Tutorial from "./components/tutorial/Tutorial";
import HallOFame from "./components/hallofame/HallOFame";
const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,

    // errorElement: <ErrorPage />,

    children: [
      { index: true, Component: Home },
      { path: "/test", Component: Test },
      { path: "/hallofame", Component: HallOFame },
      { path: "/tutorial", Component: Tutorial },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
