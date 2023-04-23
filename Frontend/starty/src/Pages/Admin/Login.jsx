import React from "react";
import { useState } from "react";
import Navbar from "../../Components/navbar";
import { Input, Button } from "@chakra-ui/react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { Data } from "../../Store/Data";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, Setmessage] = useState("");
  const [isError, Setiserror] = useState(false);
  const [ErrType, SetErrType] = useState("");

  async function handleLogin(event) {
    event.preventDefault();
    if (!email || !password) {
      Setiserror(true);
      SetErrType("warning");

      return Setmessage(
        "Corrigez le champ manquant, veuillez remplir tous les champs !"
      );
    }
    
    const response = await fetch(`${Data.server_url}api/admin/login `, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    const json = await response.json()
    if(json.error){
        Setiserror(true);
        SetErrType('error')
        Setmessage(json.error)
    }else if (response.status == 200){
      localStorage.setItem('token', json.token);
    }
     
    // Handle login logic here
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
          {isError ? (
            <Alert status={ErrType} width={"auto"} margin={"3"} >
              <AlertIcon />

              <AlertDescription>{message}</AlertDescription>
            </Alert>
          ) : (
            ""
          )}

          <h2 className="text-2xl font-bold mb-4">
            Connectez-vous à votre compte
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="email"
                aria-required
              >
                Email
              </label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="password"
              >
                Mot de passe
              </label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              colorScheme="facebook"
              className="float-right"
            >
              Se connecter
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
