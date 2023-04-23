 
import Home from "./Pages/Home";
import Agence from "./Pages/agence";
import Scpi from "./Pages/scpi";
import Login from "./Pages/Admin/Login";
import Dashboard from "./Pages/Admin/Dashboard";
import Notfound from "./Pages/Notfound";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import { useState, useContext } from "react";
import AuthContext from "./context/Authcontext";
function App() {
  const { authReady } = useContext(AuthContext);
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agence/:slug" element={<Agence />} />
          <Route path="/agence/" element={<Agence />} />
          <Route path="/scpi/:slug" element={<Scpi />} />
          <Route path="/scpi" element={<Scpi />} />

          <Route path="*" element={<Notfound />} />
          <Route
            path="/admin/login"
            element={authReady ? <Dashboard /> : <Login />}
          />
          <Route
            path="/admin/dashboard"
            element={authReady ? <Dashboard /> : <Login />}
          />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
