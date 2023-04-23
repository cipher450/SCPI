import Navbar from "../Components/navbar";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { Info , Cloud, DollarSign } from "react-feather";
import Footer from "../Components/Footer";
export default function Home() {
  return (
    <div>
      
      <div className="flex flex-wrap lg:flex-row flex-col m-5 items-center justify-center">
        <div className="lg:w-1/2">
          <h1 className=" text-5xl lg:text-6xl font-bold mb-3">
            Investire en <span className="text-green-600 ">SCPI</span>n’a jamais
            etais aussi simple
          </h1>
          <p className="text-xl lg:text-2xl font-semibold">
            Explorez toutes les possibilités pour choisir la meilleure.
          </p>
        </div>
        <div className="lg:w-1/3 mt-10 lg:mt-auto">
          <Player
            autoplay
            loop
            src="https://assets1.lottiefiles.com/packages/lf20_kuiykf08.json"
          ></Player>
        </div>
      </div>

      <div className="factContainer ">
        <div className="fact">
          <Info className="w-44" size={200} />
          <div className="flex flex-col align-middle self-center">
            <span className="font-bold">Information exhaustive</span>
            <span className="text-sm">
            informations complètes sur les différentes SCPI et agences immobilières en France, regroupées en un seul endroit.
            </span>
          </div>
        </div>
        <div className="fact">
          <Cloud className="w-44" size={200} />
          <div className="flex flex-col align-middle self-center">
            <span className="font-bold">Accessibilité</span>
            <span className="text-sm">
            Toutes ces informations nécessaires sont disponibles en ligne.
            </span>
          </div>
        </div>
        <div className="fact">
          <DollarSign className="w-44" size={200} />
          <div className="flex flex-col align-middle self-center">
            <span className="font-bold">Valeur ajoutée pour les agences immobilières</span>
            <span className="text-sm">
              Nos experts et nos algorithmes identifient les meilleures
              opportunités d’investissement en SCPI.
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-3/4 m-auto mb-20">
        <div className="flex flex-col lg:flex-row items-center gap-3">
          <div className="basis-1/2 mt-10 lg:mt-auto">
            <Player
              autoplay
              loop
              src="https://assets3.lottiefiles.com/packages/lf20_dprsutzw.json"
            ></Player>
          </div>
          <div className="flex basis-1/2 flex-col gap-20">
            <span className="text-2xl  font-bold text-center">Investissement en SCPI</span>
          <p className="">
          Si vous cherchez à investir dans l'immobilier en France, il peut être difficile de trouver le bon investissement et de faire de l'argent. Cependant, notre site de répertoire SCPI et d'agences immobilières peut vous aider à trouver les informations dont vous avez besoin pour prendre une décision éclairée.
          </p>
          </div>
        
        </div>
      </div>
      <div className="flex flex-col w-3/4 m-auto">
        <div className="flex flex-col lg:flex-row items-center gap-3">
        
          <div className="flex basis-1/2 flex-col gap-20">
            <span className="text-2xl  font-bold text-center">Découvrez les SCPI sélectionnées par des experts de l'immobilier</span>
          <p className="">
          Nous avons travaillé avec des experts du secteur immobilier pour sélectionner les SCPI qui offrent les meilleures opportunités d'investissement en France. Ces experts ont examiné chaque SCPI en profondeur, évaluant des critères tels que le taux de rendement, la diversification du portefeuille, la qualité des actifs immobiliers, et bien plus encore.
          </p>
          </div>
          <div className="basis-1/2 mt-10 lg:mt-auto">
            <Player
            
              autoplay
              loop
              src="https://assets3.lottiefiles.com/packages/lf20_njyx3r5a.json"
            ></Player>
          </div>
        </div>
      </div>
     
    </div>
  );
}
