import CustomTable from "../../Components/Admin/CustomTable";
import {
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  WrapItem,
  Avatar,
  Center,
} from "@chakra-ui/react";
import { getAgencys, searchAgency, getSCPI } from "../../requests";
import { useState, useEffect } from "react";
import { defaultSCPI_model , defaultAgency_Model } from "../../Store/Data";
import CustomModal from "../../Components/Admin/CustomModal";
import { Plus , Eye} from "react-feather";
export default function Dashboard() {
  const [agencyList, SetagencyList] = useState([]);
  const scpiObjKeys = Object.keys(defaultSCPI_model);
  const agencyobjKeys = Object.keys(defaultAgency_Model);
  console.log(agencyList);

  async function getAgency() {
    let data = await getAgencys();

    if (data.error) {
      console.log(data);
    } else {
      SetagencyList(data);
    }
  }
  async function getscpi() {
    let data = await getSCPI();

    if (data.error) {
      console.log(data);
    } else {
      SetagencyList(data);
    }
  }

  useEffect(() => {
    getAgency();
  }, []);

  return (
    <div className="Dashboard--Container ">
      <div className="Dashboard--sideBar bg-gray-900">
        <div className="Dashboard--sideBar--profile ">
          <WrapItem alignItems={"center"} gap={25} margin={"5"} padding={"5"}>
            <Avatar name="Admin" backgroundColor={"orange"}/>
            <Text fontSize={"xl"} fontWeight={"bold"}>
              Admin
            </Text>
          </WrapItem>
        </div>
        <div className="flex flex-col gap-1">
          <Menu>
            <MenuButton as={Button} colorScheme="facebook">
              Les Agence
            </MenuButton>
            <MenuList backgroundColor="facebook.900">
              <MenuItem backgroundColor="facebook.900" className="mb-2"   onClick={getAgency}><Eye className="mr-2"/> Afficher</MenuItem>
              <CustomModal
              btnTxt={'Ajouter'}
              keys={agencyobjKeys}
              obj={defaultAgency_Model}
              />
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} colorScheme="facebook" >
            Les SCPI
            </MenuButton>
            <MenuList backgroundColor="facebook.900">
              <MenuItem backgroundColor="facebook.900" className="mb-2"  onClick={getscpi}><Eye className="mr-2"/> Afficher</MenuItem>
              <CustomModal
              btnTxt={'Ajouter'}
              keys={scpiObjKeys}
              obj={defaultSCPI_model}
              />
               
            </MenuList>
          </Menu>

          
          
        </div>
      </div>
      <div className="Dashboard--Main">
        {agencyList.length == 0 ? "" : <CustomTable agencyList={agencyList} />}
      </div>
    </div>
  );
}
