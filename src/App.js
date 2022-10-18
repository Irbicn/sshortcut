import {
  createRoutesFromElements,
  RouterProvider,
  Route,
  createBrowserRouter,
} from "react-router-dom";
import Inicio from "./paginas/Inicio";
import Usuario from "./paginas/Usuario";
import Redirect, { loader as RedirectLoader } from "./paginas/Redirect";
import NotFound from "./paginas/NotFound";
import config from "./axiosConfig";
import RootLayout from "./paginas/RootLayout";
import "./App.scss";

config();

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="*" element={<NotFound />} />
      <Route element={<RootLayout />}>
        <Route index element={<Inicio />} />
        <Route path="/cuenta" element={<Usuario />} />
      </Route>
      <Route
        path=":url"
        errorElement={<NotFound />}
        element={<Redirect />}
        loader={RedirectLoader}
      />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
