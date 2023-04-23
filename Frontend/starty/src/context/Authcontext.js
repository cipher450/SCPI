import { createContext, useState, useEffect } from "react";
import { Data } from "../Store/Data";
const AuthContext = createContext({
   
 
  authReady: null,
});
export function AuthContextProvider({ children }) {
  const local_Token = localStorage.getItem("token");

  const [authReady, setauthReady] = useState(false);
 

  const context = { authReady };
  useEffect(() => {
    async function verify() {
      if (local_Token) {
        const res = await fetch(`${Data.server_url}api/admin/auth/`, {
          method: "POST",  
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            token: local_Token,
          }),
        });

        if (res.status == 200) {
          setauthReady(true);
          
        } else {
          setauthReady(false);
        }
      }
    }
    verify();
  }, []);

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
}

export default AuthContext;
