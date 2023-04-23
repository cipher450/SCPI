import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/colors.css"
import "./styles/controls.css"
import "./styles/Responsive.css"
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/Authcontext";
import Layout from "./Layout";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthContextProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
