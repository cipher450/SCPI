import React, { useEffect, useState } from "react";
import { Data } from "../Store/Data";
import { Tag } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
export default function MoreInfo_SCPI({ slug }) {
  const [scpi, Setscpi] = useState({});
  useEffect(() => {
    async function getAgency() {
      const response = await fetch(
        `${Data.server_url}api/scpi/findOne/${slug}`
      );
      const data = await response.json();
      Setscpi(data[0]);
    }
    getAgency();
  }, []);
  console.log(scpi);
  return (
    <div>
      <div className="moreinfo--scpi">
        <div className="flex gap-1 m-5">
          <Tag colorScheme="green">{scpi.capitalType}</Tag>
          {scpi.lifeInsurance ? (
            <Tag colorScheme="green">Assurance a vie</Tag>
          ) : (
            ""
          )}
          <Tag colorScheme="facebook">{scpi.type}</Tag>
        </div>
        <div className="moreinfo--scpi--body">
          <div className="flex gap-5 flex-col basis-1/3">
            <div>
              <h1 className="text-4xl font-bold">{scpi.title}</h1>
              <span>{scpi.agencyparent}</span>
            </div>
            <Tabs>
              <TabList>
                <Tab>Description</Tab>
                <Tab>Histoire</Tab>
                <Tab>Profile</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <p>{scpi.description}</p>
                </TabPanel>
                <TabPanel>
                  <p>{scpi.history}</p>
                </TabPanel>
                <TabPanel>
                  <p>{scpi.profil}</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
          <div className="flex gap-3 flex-col lg:flex-row basis-10/12">
            <table class="moreinfo--table">
              <tbody>
                <tr>
                  <th>Capitalisation</th>
                  <td>{scpi.capitalisation}</td>
                </tr>

                <tr>
                  <th>Taux de Distribution</th>
                  <td>{scpi.distributionRate}</td>
                </tr>

                <tr>
                  <th>Prix de la part</th>
                  <td>{scpi.partPrice}</td>
                </tr>
                <tr>
                  <th>Minimum souscription</th>
                  <td>{scpi.minSub}</td>
                </tr>

                <tr>
                  <th>Frais de gestion TTC</th>
                  <td>{scpi.gestionFee}</td>
                </tr>
                <tr>
                  <th>Délai de jouissance</th>
                  <td>{scpi.periodOfEnjoyment}</td>
                </tr>
                <tr>
                  <th>Répartition Typologique</th>
                  <td>{scpi.category}</td>
                </tr>

                <tr>
                  <th>Répartition Géographique</th>
                  <td>{scpi.localisation}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
