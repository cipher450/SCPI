import React from 'react'
import Navbar from '../Components/navbar'
export default function Notfound() {
  return (
    <>
   
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

    <div className="p-8 bg-white shadow-lg rounded">
      <h1 className="text-4xl font-bold mb-4">Page non trouvée</h1>
      <p className="text-lg mb-4">Désolé, la page que vous cherchez est introuvable.</p>
      <a href="/" className="text-blue-500 hover:underline">Retourner à la page d'accueil</a>
    </div>
  </div>
  </>
  )
}
