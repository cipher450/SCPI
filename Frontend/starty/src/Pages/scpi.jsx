import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MoreInfo_SCPI from "../Components/MoreInfo_SCPI";
import Navbar from "../Components/navbar";
import Filtre from "../Components/Filtre";
import ScpiCard from "../Components/ScpiCard";
import { Input, Text, Button } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Data } from "../Store/Data";
import { Search, Filter } from "react-feather";
export default function Scpi() {
  const [scpiList, SetscpiList] = useState([]);
  const [searchWord, SetsearchWord] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  let { slug } = useParams();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)"); // define the media query to match mobile devices
    setIsMobile(mediaQuery.matches); // update state based on the current match of the media query

    const handleResize = () => setIsMobile(mediaQuery.matches); // update state when the media query match changes
    mediaQuery.addListener(handleResize);

    return () => mediaQuery.removeListener(handleResize); // clean up event listener when the component unmounts
  }, []);

  // Function to get all of the scpi list
  async function getScpi() {
    const response = await fetch(`${Data.server_url}api/scpi/find/`);
    const data = await response.json();
    SetscpiList(data);
  }

  // search function
  async function searchSCPI(str) {
    if (!str) {
      // check to see if the search bar is empty then get the full list
      getScpi();
    }
    const response = await fetch(`${Data.server_url}api/scpi/search/${str}`);
    const data = await response.json();
    SetscpiList(data);
  }
  console.log(scpiList);
  // Runs at each new reload
  useEffect(() => {
    getScpi();
  }, []);
  return (
    <div>
      {!slug && (
      <div className="Banner gradiant--5">
        <span className="text-2xl text-center font-bold text-white">
          Sélection des meilleures SCPI
        </span>
      </div>
      )
       }
      {slug ? (
        <MoreInfo_SCPI slug={slug} />
      ) : (
        <div className="flex gap-5">
          {isMobile ? (
            ""
          ) : (
            <Filtre ScpiList={scpiList} SetScpiList={SetscpiList}  />
          )}

          <div className="CardContainer--Warpper">
            <div className="flex items-center justify-end  mt-10 gap-2">
              <Text className=" font-semibold mr-3">Recherche</Text>
              <Input
                width={"72"}
                border={"1px"}
                placeholder="Recherche"
                onChange={(e) => {
                  SetsearchWord(e.currentTarget.value);
                }}
              />
              {isMobile ? (
                <>
                  <Button colorScheme="facebook" onClick={onOpen}>
                    <Filter />{" "}
                  </Button>

                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                    
                      <ModalCloseButton />
                      <Filtre ScpiList={scpiList} SetScpiList={SetscpiList} />
                    </ModalContent>
                  </Modal>
                </>
              ) : (
                ""
              )}

              <Button
                colorScheme="facebook"
                onClick={(e) => {
                  searchSCPI(searchWord);
                }}
              >
                {" "}
                <Search />{" "}
              </Button>
            </div>

            <div className="ScpiCard--Container">
              {scpiList.map((scpi) => (
                <ScpiCard key={scpi.id} obj={scpi} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
