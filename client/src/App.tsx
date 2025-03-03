//import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
//import Home from "./components/Home";
import Navigation from "./components/Navigation";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ColabBoard from "./components/ColabBoard";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Navigation />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <ColabBoard />
                </>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
