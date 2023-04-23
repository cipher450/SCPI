import { useEffect, useState, useRef } from "react";

import { Menu } from "react-feather";
import { Link } from "react-router-dom";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
 
} from "@chakra-ui/react";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)"); // define the media query to match mobile devices
    setIsMobile(mediaQuery.matches); // update state based on the current match of the media query

    const handleResize = () => setIsMobile(mediaQuery.matches); // update state when the media query match changes
    mediaQuery.addListener(handleResize);

    return () => mediaQuery.removeListener(handleResize); // clean up event listener when the component unmounts
  }, []);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  /* <div className="flex items-center ">
        <Input placeholder="Chercher une SCPI" className="custom_input " />
        <Button colorScheme="facebook">
          <Search />
        </Button>
      </div>*/
  return (
    <div class="nav flex justify-between items-center">
      <div class="nav-header">
        <img src={require("../res/Logo.png")} alt="" />
        <Link  class="nav-title" >SCPI360</Link>
      
      </div>

      <div>
        {isMobile ? (
          <>
            <Button ref={btnRef} colorScheme="facebook" onClick={onOpen}>
              <Menu/>
            </Button>
            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              finalFocusRef={btnRef}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />

                <DrawerBody>
                  <div className="flex flex-col text-2xl mt-10 gap-5">
                  <Link className="hover:bg-blue-900 hover:text-white p-2 rounded-xl transition-all duration-100  ease-in-out" to="/">Accueil</Link>
                  <Link  className="hover:bg-blue-900 hover:text-white p-2 rounded-xl transition-all duration-100  ease-in-out " to="/agence">Société de gestion</Link>
                  <Link className="hover:bg-blue-900 hover:text-white p-2 rounded-xl transition-all duration-100  ease-in-out " to="/scpi">SCPI</Link>
                  </div>
                
                </DrawerBody>

              
              </DrawerContent>
            </Drawer>
          </>
        ) : (
          <div class="nav-links flex flex-end text-xl gap-2 ">
         <Link className="hover:bg-white hover:text-black p-2 rounded-xl transition-all duration-100  ease-in-out" to="/">Accueil</Link>
                  <Link  className="hover:bg-white hover:text-black p-2 rounded-xl transition-all duration-100  ease-in-out " to="/agence">Société de gestion</Link>
                  <Link className="hover:bg-white hover:text-black p-2 rounded-xl transition-all duration-100  ease-in-out " to="/scpi">SCPI</Link>
          </div>
        )}
      </div>
    </div>
  );
}
