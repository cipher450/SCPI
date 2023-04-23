import React, { useState, useEffect } from "react";
import { Checkbox, Switch, Textarea, useDisclosure } from "@chakra-ui/react";
import { category, capitalType, localisation, type } from "../../Store/store";
import {
  updateAgency,
  deleteAgency,
  deleteSCPI,
  updateSCPI,
  getAgencys,
  addAgency,
  addSCPI,
} from "../../requests";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Input,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Select,
} from "@chakra-ui/react";
import { Plus, Edit, Delete } from "react-feather";
export default function CustomModal({ obj, keys, btnTxt }) {
  const [message, Setmessage] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputValues, setInputValues] = useState(obj);

  const [agencyList, SetagencyList] = useState([]);

  
  useEffect(() => {
    async function func() {
      const response = await getAgencys(inputValues);
      SetagencyList(response);
    }

    func();
  }, []);

  async function update() {
    // 'obj.bio' is used  to check whether the 'obj' is the Agency table or SCPI i used 'bio' comme un repere pour ce situer vu que
    // bio n'est pas dans la table scpi

    if ("bio" in obj) {
      const response = await updateAgency(inputValues);
      Setmessage(response);
    } else {
      const response = await updateSCPI(inputValues);
      Setmessage(response);
    }
    setInputValues(!obj.id && obj); // remettre au valeur par default si ont es sur mode 'Creation'
  }
  async function deletez() {
    if ("bio" in obj) {
      const response = await deleteAgency(inputValues.id);
      Setmessage(response);
    } else {
      const response = await deleteSCPI(inputValues.id);
      Setmessage(response);
    }
    setInputValues(obj); // remettre au valeur par default
  }

  async function add() {
    if ("bio" in obj) {
      const response = await addAgency(inputValues);
      Setmessage(response);
    } else {
      const response = await addSCPI(inputValues);
      Setmessage(response);
    }
    setInputValues(obj); // remettre au valeur par default
  }

  return (
    <>
      <Button onClick={onOpen} colorScheme="green">
        {btnTxt}
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered size={"6xl"}>
        <ModalOverlay />
        <ModalContent>
          {message ? (
            <Alert
              width={"auto"}
              margin={"3"}
              borderRadius={"base"}
              onClick={() => {
                Setmessage("");
              }}
            >
              <AlertIcon />

              <AlertDescription>{message}</AlertDescription>
            </Alert>
          ) : (
            ""
          )}
          <ModalHeader>{obj.title}</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <div className="grid grid-cols-3 gap-4">
              {keys.map((key) => {
                /*
                if(key=="AGENCYPARENT" || key=="Token"){
                  return("")
                }
                */
                return (
                  <div key={key}>
                    <Text color={"facebook.900"} fontWeight={"bold"}>
                      {key.toLocaleUpperCase()}
                    </Text>

                    {key == "profil" ||
                    key == "description" ||
                    key == "history" ||
                    key == "bio" ? (
                      <Textarea
                        defaultValue={obj[key]}
                        onChange={(event) => {
                          setInputValues({
                            ...inputValues,
                            [key]: event.target.value,
                          });
                        }}
                      />
                    ) : key == "lifeInsurance" || key == "inOurSelection" ? (
                      <Switch
                        isChecked={inputValues[key]}
                        onChange={(event) => {
                          setInputValues({
                            ...inputValues,
                            [key]: event.target.checked,
                          });
                        }}
                      />
                    ) : key == "parentAgency" ? (
                      <Select
                        colorScheme="facebook"
                        fontSize={"sm"}
                        onChange={(event) => {
                          setInputValues({
                            ...inputValues,
                            [key]: event.target.value,
                          });
                        }}
                      >
                        {agencyList.map((agency) => {
                          if (agency.id == obj[key]) {
                            return (
                              <option value={agency.id} selected>
                                {agency.title}
                              </option>
                            );
                          }
                          return (
                            <option value={agency.id}>{agency.title}</option>
                          );
                        })}
                      </Select>
                    ) : key == "type" ? (
                      <Select
                        colorScheme="facebook"
                        fontSize={"sm"}
                        onChange={(event) => {
                          setInputValues({
                            ...inputValues,
                            [key]: event.target.value,
                          });
                        }}
                      >
                        {type.map((item) => {
                          if (item == obj[key]) {
                            return (
                              <option value={item} selected>
                                {item}
                              </option>
                            );
                          }
                          return <option value={item}>{item}</option>;
                        })}
                      </Select>
                    ) : key == "category"  || key == "localisation" ? (
                      <>
                        <Select
                         id={obj[key]}
                          colorScheme="facebook"
                          fontSize={"sm"}
                          onChange={(event) => {
                            let selected = event.currentTarget.value;
                            let currentValue = inputValues[key]
                            if(currentValue.includes(selected)){
                              currentValue=  currentValue.replace(new RegExp(",?\\s*" + selected + "\\s*,?", "g"), "")
                                
                                setInputValues({
                                  ...inputValues,
                                  [key]: currentValue,
                                });
                            }else{
                              currentValue=currentValue+','+selected
                              setInputValues({
                                ...inputValues,
                                [key]: currentValue,
                              });
                            }
                            document.getElementById(obj[key]).value = "Selectioner pour ajouter ou supprimer"
                          }}
                        >
                          { key == "category"   ? category.map((item) => {
                            if (item == obj[key]) {
                              return (
                                <option value={item} selected>
                                  {item}
                                </option>
                              );
                            }
                            return <option value={item}>{item}</option>;
                          }) : localisation.map((item) => {
                            if (item == obj[key]) {
                              return (
                                <option value={item} selected>
                                  {item}
                                </option>
                              );
                            }
                            return <option value={item}>{item}</option>;
                          }) }
                        </Select>

                        <Input
                           
                          value={inputValues[key]}
                          onChange={(event) => {
                            setInputValues({
                              ...inputValues,
                              [key]: event.target.value,
                            });
                          }}
                        />
                      </>
                    ) : key == "capitalType" ? (
                      <Select
                        colorScheme="facebook"
                        fontSize={"sm"}
                        onChange={(event) => {
                          setInputValues({
                            ...inputValues,
                            [key]: event.target.value,
                          });
                        }}
                      >
                        {capitalType.map((item) => {
                          if (item == obj[key]) {
                            return (
                              <option value={item} selected>
                                {item}
                              </option>
                            );
                          }
                          return <option value={item}>{item}</option>;
                        })}
                      </Select>
                    ) : (
                      <Input
                        readOnly={
                          key == "id" || key == "createdAt" ? true : false
                        }
                        defaultValue={obj[key]}
                        onChange={(event) => {
                          setInputValues({
                            ...inputValues,
                            [key]: event.target.value,
                          });
                        }}
                        required
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </ModalBody>

          <ModalFooter gap={"5px"}>
            {
              // voir si un 'id' est present si oui alors ca voudrais dire que ont es en mode 'Modification' , si non ont affiche que le button Ajouter
              !obj.id ? (
                <Button onClick={add} colorScheme="green">
                  <Plus className="mr-2" />
                  Ajouter
                </Button>
              ) : (
                <>
                  <Button onClick={deletez} colorScheme="red">
                    <Delete className="mr-2" />
                    Supprimer
                  </Button>
                  <Button onClick={update} colorScheme="green">
                    <Edit className="mr-2" />
                    Mettre a jour
                  </Button>
                </>
              )
            }

            <Button onClick={onClose}>Fermer</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
