import { useState, useEffect } from "react";
import Navbar from "../Components/navbar";
import Card from "../Components/Card";
import Moreinfo from "../Components/Moreinfo";
import { Data } from "../Store/Data";
import { Button, Input, Text } from "@chakra-ui/react";
import { Search } from "react-feather";
import { useParams } from "react-router-dom";
import { searchAgency } from "../requests";
export default function Agence() {

  const [searchWord,SetsearchWord]= useState("")
  const [agencyList, SetagencyList] = useState([]);
  
  let { slug } = useParams();

  async function getAgency() {
    const response = await fetch(`${Data.server_url}api/agency/find`);
    const data = await response.json();
    SetagencyList(data);
    console.log(agencyList);
    console.log(data);
  }
 async function SearchAgency(str){
    if(!str){ // check to see if the search bar is empty then get the full list
      getAgency();
    }else{
      const data = await searchAgency(str)
      SetagencyList(data);
    }
      
    
     
  }


  useEffect(() => {
    
    getAgency();
  }, []);
  
  return (
    <div>
   
      <div className="Banner gradiant--5">
        <Text className="text-2xl text-center font-bold text-white">
          Sociétés de gestion
        </Text>
      </div>
      {slug ? (
        <Moreinfo slug={slug} />
      ) : (
        <>
          <div className="CardContainer--Warpper">
            <div className="flex items-center justify-end  mt-10 gap-2">
              <Text className=" font-semibold mr-3">Recherche :</Text>
              <Input width={"72"} border={"1px"} placeholder="Recherche"  onChange={(e)=>{SetsearchWord(e.currentTarget.value)}} />
              <Button colorScheme="facebook" onClick={(e)=>{SearchAgency(searchWord)}}>  <Search/> </Button>
            </div>
            <div className="CardContainer">
              {agencyList.map((agency) => (
                    
                <Card
                  key={agency.slug}
                  name={agency.title}
                  slug={agency.slug}
                  actionnaire={agency.MajorityShareholder}
                  creation={agency.agencyCreation}
                  effectif={agency.effective}
                  funds={agency.fund}
                 logo_url={agency.logo_url}
                 global={agency.encours}
               
                />
              ))}
            </div>
          </div>

          <div className="lg:p-10 lg:w-2/3 lg:m-auto m-5 flex flex-col gap-5">
            <h1 className="text-4xl text-center font-bold ">
              Sociétés de gestion des SCPI
            </h1>
            <p className="text-left">
              Les sociétés de gestion gèrent une ou plusieurs SCPI. Elles sont
              l’intermédiaire par lequel les investisseurs souscrivent aux parts
              de SCPI. Elles doivent au préalable obtenir l’agrément de
              l’Autorité des Marchés Financiers (AMF). <br /> <br />
              Le rôle principal des sociétés de gestion est de collecter les
              capitaux auprès des investisseurs. Outre ce rôle, elles ont en
              charge de :
            </p>
            <div className="flex lg:flex-row flex-col gap-5">
              <div className="flex flex-col  items-center">
                <img
                  src={require("../res/computer-search.png.webp")}
                  width={64}
                />
                <span className="text-center">
                  Trouver les futurs locataires qui occuperont ces biens.
                </span>
              </div>
              <div className="flex flex-col  items-center">
                <img
                  src={require("../res/selection-biens.png.webp")}
                  width={64}
                />
                <span className="text-center">
                  Assurer la sélection des biens qui vont constituer le parc
                  immobilier de la SCPI.
                </span>
              </div>
              <div className="flex flex-col  items-center">
                <img
                  src={require("../res/gestion-biens.png.webp")}
                  width={64}
                />
                <span className="text-center">
                  Gérer l’ensemble des biens du parc immobilier.
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
