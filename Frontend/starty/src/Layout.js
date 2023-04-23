import React from "react";
import Navbar from "./Components/navbar";
import Footer from "./Components/Footer";
export default function Layout({ children }) {
  return (
    <>
       
        <Navbar />
        <main>{children}</main>
        <Footer />
 
    
    </>
  );
}
