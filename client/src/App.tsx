import Login from "./components/Login";
import Register from "./components/Register";
import Navigation from "./components/Navigation";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import ColabBoard from "./components/ColabBoard";
import ColabBoard2 from "./components/ColabBoard2";

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
                  <ColabBoard2 />
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
