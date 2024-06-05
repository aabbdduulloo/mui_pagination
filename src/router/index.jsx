import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "../App";
import Login from "../components/login/login";
import Cars from "../components/cars/cars";
import SingleCar from "../components/single-car/single-car";
import Main from "../components/main/main";
import Brand from "../components/brands/brand";
const Index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<Login />} />
        <Route path="main/*" element={<Main />}>
          <Route index element={<Cars />} />
          <Route path="single-car/:id" element={<SingleCar />} />
          <Route path="brand" element={<Brand />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default Index;
