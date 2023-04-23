import React, { useState, useEffect } from "react";
import { Data } from "../Store/Data";
import { category, capitalType, localisation, type } from "../Store/store";
import { filtreSCPI , getAgencys } from "../requests";
import {
  Select,
  Checkbox,
  FormControl,
  FormLabel,
  Stack,
  Button,
} from "@chakra-ui/react";
export default function Filtre({ ScpiList, SetScpiList  }) {
  const [params, Setparams] = useState({
    query: {
      search: "",
      parentAgency: "",
      inOurSelection: "",
      type: [],
      category: [],
      localisation: [],
      lifeAssurance: "",
    },
  });
  const [agencyList, SetagencyList] = useState([]);
  
  async function filtreReq() {
    
      let data = await filtreSCPI(params)
      
      SetScpiList(data)   
      
       
  }

  //Getting agency list
  useEffect(() => {
    async function getAgency() {
      const data = await getAgencys();
      SetagencyList(data);
    }
    getAgency();
  }, []);
  // updating each param
  const updateParams = (key, value , isArray , e ) => {
    
    if(!isArray){ // Vérifier s'il s'agit d'un tableau ou non, car le traitement n'est pas le même.
      Setparams((prevParams) => ({
        ...prevParams,
        query: {
          ...prevParams.query,
          [key]: value,
        },
      }))
    }  else {
      Setparams((prevParams) => { 
        let index = prevParams.query[key].indexOf(value)
        
        const newArray = e.checked
        ? index ==-1 && prevParams.query[key].push(value) // si l'index est -1 cela voudrait dire que value n'exsite pas dans le array est donc on l'ajoute
        : index !==-1 && prevParams.query[key].splice(index,1) // si non ont le supprime


        return { ...prevParams,[key]:newArray}
      })
    }
  
  };
  
  return (
    <div className="Filtre">
      <span>Filtrer les SCPI</span>{" "}
      {/* it seems that the chakrUI compoenets do not inherit styles... */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col">
          <FormLabel fontSize={"sm"}>Société de gestion</FormLabel>
          <Select
            colorScheme="facebook"
            fontSize={"sm"}
            placeholder="Selectionnez une société"
            onChange={(e) =>
              updateParams("parentAgency", e.currentTarget.value)
            }
          >
            {agencyList.map((agency) => (
              <option value={agency.id}>{agency.title}</option>
            ))}
          </Select>
        </div>

        <div className="flex flex-col">
          <FormLabel fontSize={"sm"}>Type de SCPI</FormLabel>
          <Checkbox
            colorScheme="facebook"
            onChange={ (e) =>  updateParams('type',e.currentTarget.value,true,e.currentTarget)}
            value={'SCPI de rendement'}
          >
            SCPI de rendement
          </Checkbox>
          <Checkbox
            colorScheme="facebook"
            onChange={ (e) =>  updateParams('type',e.currentTarget.value,true,e.currentTarget)}
            value={'SCPI de plus-value'}
          >
            SCPI de plus-value
          </Checkbox>
        </div>
        <div className="flex flex-col">
          <FormLabel fontSize={"sm"}>Catégorie de la SCPI</FormLabel>
          {category.map((cat) => (
            <Checkbox
              colorScheme="facebook"
              onChange={ (e) =>  updateParams('category',e.currentTarget.value,true,e.currentTarget)}
              value={cat}
            >
              {cat}
            </Checkbox>
          ))}
        </div>

        <div className="flex flex-col flex-wrap">
          <FormLabel fontSize={"sm"}  >Localisation de la SCPI</FormLabel>
          {localisation.map((cat) => (
            <Checkbox
              colorScheme="facebook"
              onChange={ (e) =>  updateParams('localisation',e.currentTarget.value,true,e.currentTarget)}
              value={cat}
            >
              {cat}
            </Checkbox>
          ))}
        </div>
        <div className="flex flex-col">
          <FormLabel fontSize={"sm"}>Assurance vie</FormLabel>
          <Checkbox colorScheme="facebook" onChange={(e)=>updateParams('lifeAssurance',e.currentTarget.checked)}>
            Disponible en Assurance vie
          </Checkbox>
        </div>
        <Button colorScheme="facebook" onClick={filtreReq}>Filtre</Button>
      </div>
    </div>
  );
}
