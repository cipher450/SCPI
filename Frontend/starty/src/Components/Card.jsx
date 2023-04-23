import {useState , useEffect} from "react";
import { Divider } from '@chakra-ui/react'

export default function Card({
  name,
  logo_url,
  creation,
  funds,
  global,
  effectif,
  actionnaire,
  slug,
  gradiant
})

{
  // Generating a Random number to select a gradiant class
  const [randomnum, setrandomnum] = useState(0);
  function GenRandomNum() {
    const randomInt = Math.floor(Math.random() * 4) + 1;
    setrandomnum(randomnum + randomInt);
  }
  useEffect(() => {
    GenRandomNum()
  }, []);
  return (
 
    <a className={"Card gradiant--"+randomnum} href={"agence/"+slug}>

      <div className="Card--Header">
        <span className="Card--HeaderText">{name}</span>
        <img src={logo_url} alt=""  width={64}  />
      </div>



      <div className="Card--Body">

        <div className="Card--body-- flex flex-col gap-5">

          <div className="Card--Body--inner">
            <span className="text-sm">Création</span>
            <span className="text-base font-bold">{creation.substring(0,10)}</span>
          </div>
          <div className="Card--Body--inner">
            <span className="text-sm">Encours Global SCPI</span>
            <span className="text-base font-bold">{global}</span>
          </div>
        
         
        </div>
        <div className="Card--body-- flex flex-col gap-5">
        
        <div className="Card--Body--inner">
            <span className="text-sm">Nombre De Fonds</span>
            <span className="text-base font-bold">{funds}</span>
          </div>
          <div className="Card--Body--inner">
            <span className="text-sm">Effectif</span>
            <span className="text-base font-bold">{effectif}</span>
          </div>
        </div>

       
      </div>

      <div className="Card--Footer">
        <div className="Card--Footer--inner">
          <span className="text-sm">Actionnaire majoritaire</span>
          <Divider orientation="vertical" />
          <span className="text-base font-bold">{actionnaire}</span>
        </div>
      </div>
    </a>
  );
}
