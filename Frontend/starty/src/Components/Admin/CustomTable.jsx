import React from "react";
import { Button, Table } from "@chakra-ui/react";
import Loading from "../Loading";
import { Image, Textarea } from "@chakra-ui/react";
import CustomModal from "./CustomModal";
export default function CustomTable({ agencyList, SetAgency }) {
  let keys;
  if (agencyList == undefined || agencyList == null) {
    return <> Error </>;
  } else {
    keys = Object.keys(agencyList[0]);
  }

  return (
    <div className="Custom--Table ">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            {keys.map((key) => (
              <th scope="col" className="px-6 py-4 font-medium text-gray-900 ">
                {key.toLocaleUpperCase()}
              </th>
            ))}
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {
            //Looping thourgh the list and retrun a row for each agency
            agencyList.map((agency) => {
              return (
                <tr className="hover:bg-gray-50">
                  {
                    // usign the keys variabls to dynamicly get every key name to match the agency key
                    keys.map((key) => {
                      if (key == "logo_url") {
                        // adding an img to show the image instead of the url
                        return (
                          <td className="px-6 py-4 ">
                            <img src={agency[key]} alt={agency[key]} />
                          </td>
                        );
                      }
                      if (
                        key == "bio" ||
                        key == "profil" ||
                        key == "history" ||
                        key == "description"
                      ) {
                        // adding an Textarea so that it does not take the whole screen !!!
                        return (
                          <td className="px-6 py-4">
                            <Textarea
                              value={agency[key]}
                              width={"48"}
                              readOnly
                            />{" "}
                          </td>
                        );
                      }
                      return <td className="px-6 py-4 ">{agency[key]}</td>; // showing the rest of the values normaly
                    })
                  }
                  <td className="px-6 py-4 ">
                    <CustomModal
                      obj={agency}
                      keys={keys}
                      key={agency.id}
                      btnTxt={"Modifer"}
                    />
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}
