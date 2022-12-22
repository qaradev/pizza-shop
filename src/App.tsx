import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Main from "./layouts/Main";

import "./scss/app.scss";

const Cart = React.lazy(() => import(/*webpackChunkName:"Cart"*/"./pages/Cart"));
const NotFound = React.lazy(() => import(/*webpackChunkName:"NotFound"*/"./pages/NotFound"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div className="container">Идет загрузка...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div className="container">Идет загрузка...</div>}>
              <NotFound />
            </Suspense>
          } />
      </Route>
    </Routes>
  );
}

export default App;
