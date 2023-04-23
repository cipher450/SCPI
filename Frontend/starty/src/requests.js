import { Data } from "./Store/Data";
const Token = localStorage.getItem("token");
export async function getAgencys() {
  try {
    const response = await fetch(`${Data.server_url}api/agency/find`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error.message;
  }
}
export async function searchAgency(str) {
  try {
    const response = await fetch(`${Data.server_url}api/agency/search/${str}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error.message;
  }
}

export async function addAgency(obj) {
    try {
      obj.token=Token
      const response = await fetch(`${Data.server_url}api/agency/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
      });
  
      const data = await response.json();
      return data.message;
    } catch (error) {
      return error.message;
    }
  }
  

export async function updateAgency(obj) {
  try {
      obj.token=Token
    const response = await fetch(`${Data.server_url}api/agency/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    });

    const data = await response.json();
    return data.message;
  } catch (error) {
    return error.message;
  }
}

export async function deleteAgency(id) {
  try {
    
    const response = await fetch(`${Data.server_url}api/agency/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id , token:Token }),
    });

    const data = await response.json();
    return data.message;
  } catch (error) {
    return error.message;
  }
}


export async function getSCPI() {
  try {
    const response = await fetch(`${Data.server_url}api/scpi/find/`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error.message;
  }
}
export async function searchSCPI(str){
  try {
    const response = await fetch(`${Data.server_url}api/scpi/search/${str}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error.message;
  }
}

export async function filtreSCPI(obj) {
  try {
    const response = await fetch(`${Data.server_url}api/scpi/filtre`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return error.message;
  }
}
export async function updateSCPI(obj) {
  try {
    obj.token=Token
    const response = await fetch(`${Data.server_url}api/scpi/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    });

    const data = await response.json();
    return data.message;
  } catch (error) {
    return error.message;
  }
}

export async function deleteSCPI(id) {
  try {
   
    const response = await fetch(`${Data.server_url}api/scpi/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id , token:Token }),
    });

    const data = await response.json();
    return data.message;
  } catch (error) {
    return error.message;
  }
}

export async function addSCPI(obj) {
    try {
      obj.token=Token
      const response = await fetch(`${Data.server_url}api/scpi/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
      });
  
      const data = await response.json();
      return data.message;
    } catch (error) {
      return error.message;
    }
  }
  

