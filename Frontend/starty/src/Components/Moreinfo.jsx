import { useEffect, useState } from "react";
import { Data } from "../Store/Data";
import { Divider } from "@chakra-ui/react";
export default function Moreinfo({ slug }) {
  const [agency, setagency] = useState({});
  const [agencyList, setagencyList] = useState([]);

  useEffect(() => {
    async function getAgency() {
      const response = await fetch(
        `${Data.server_url}api/agency/findOne/${slug}`
      );
      const data = await response.json();
      setagency(data[0]);
      setagencyList(data);
      console.log(data);
    }
    getAgency();
  }, []);

  return (
    <div>
      <div className="moreinfo text-lg">
        <div className="moreinfo--wrapper">
          <div className="moreinfo--content">
            <div className="moreinfo--info">
              <img src={agency.logo_url} className="m-auto" />
              <table class="moreinfo--table">
                <tbody>
                  <tr>
                    <th>Nom de la société</th>
                    <td>{agency.title}</td>
                  </tr>

                  <tr>
                    <th>Adresse</th>
                    <td>{agency.title}</td>
                  </tr>

                  <tr>
                    <th>Création</th>
                    <td>{agency.agencyCreation}</td>
                  </tr>
                  <tr>
                    <th>Encours global (M€)</th>
                    <td>{agency.encours}</td>
                  </tr>

                  <tr>
                    <th>Nombre de fonds</th>
                    <td>{agency.fund}</td>
                  </tr>

                  <tr>
                    <th>Effectif</th>
                    <td>{agency.effective}</td>
                  </tr>

                  <tr>
                    <th>Actionnaire majoritaire</th>
                    <td>{agency.MajorityShareholder}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="moreinfo--description">
              <h1 className="text-4xl font-bold text-center m-5 text-green-600">
                {agency.title}
              </h1>
              <p className="p-5 mt-5">{agency.bio}</p>
              <span className="text-xl font-bold text-center m-5 ">
                SCPI de <span className="text-green-600">{agency.title}</span> 
              </span>
              <div className="overflow-scroll overflow-x-hidden rounded-lg border border-gray-200 shadow-md  m-5 ">
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-4 font-medium text-gray-900"
                      >
                        Nom
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 font-medium text-gray-900"
                      >
                        Taux de Distribution
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 font-medium text-gray-900"
                      >
                        Prix de la part
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                 
                      {agencyList.map((scpi) => (
                       <tr  className="hover:bg-gray-50" onClick={()=>{window.open(`/scpi/${scpi.slug[1]}`)}}> {/* not a good idea to use dynamic function directly in onClick events*/}
                        <tr>
                        <td className="px-6 py-4 ">{scpi.title[1]}</td>
                      </tr>
                        <td className="px-6 py-4 ">{scpi.distributionRate}</td>
                        <td className="px-6 py-4 ">{scpi.partPrice}</td>
                        </tr>
                      ))}
                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
