import React from 'react';
import { useAuth } from "../../hooks/auth";
import { useForm } from "react-hook-form"

import {
    Button,
    Box,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    Select,
  } from "@chakra-ui/react";
import { useUpdateDetails } from '../../hooks/users';
import TextareaAutosize from "react-textarea-autosize"

function EditProfileModal () {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { register, handleSubmit} = useForm();
    
    const { user, isLoading } = useAuth();
    const { updateDetails} = useUpdateDetails(user?.id)
    
    function submitEditProfile(data) {
        if (data.description === "")
        {
            data.description = user.description;
        }
        if (data.building === "")
        {
            data.building = user.building;
        }
        if (data.favDining === "")
        {
            data.favDining = user.dining;
        }
        if (data.mealPlan === "")
        {
            data.mealPlan = user.mealPlan;
        }
        if (data.payment === "")
        {
            data.payment = user.payment;
        }

        console.log(data)
        console.log(user.id)
        updateDetails(data)
    };
    
    if (isLoading) return "Loading..."
    return (
      <>
          <Button 
            pos="absolute"
            mb="2"
            top="4"
            right="6"
            colorScheme='blue'
            color='yellow'
            onClick={onOpen}
          >
            Edit Profile
          </Button>

          <Modal isOpen={isOpen} onClose={onClose} >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Edit Profile Details</ModalHeader>
                <ModalCloseButton />

                {/* <EditProfile isOpen={isOpen} onClose={onClose} /> */}

                <ModalBody>
            <Box my={4} textAlign="left">
            <form onSubmit={handleSubmit(submitEditProfile)}>
                <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Input as={TextareaAutosize} resize='none' 
            minrows={3}  autoComplete="off" {...register("description")}  placeholder={user.description} />
                </FormControl>

                {/* pick building */}
                <FormControl mt={3}>
                    <FormLabel>Building</FormLabel>
                        <Select {...register("building")} placeholder={user.building  + " (current)"}>
                            <option value={"Not Specified"}>Not Specified</option>
                            <option value={"Canyon Point"}>Canyon Point</option>
                            <option value={"Centennial Hall"}>Centennial Hall</option>
                            <option value={"Courtside"}>Courtside</option>
                            <option value={"Delta Terrace"}>Delta Terrace</option>
                            <option value={"Evergreen"}>Evergreen</option>
                            <option value={"De Neve - Gardenia"}>De Neve - Gardenia</option>
                            <option value={"De Neve - Holly"}>De Neve - Holly</option>
                            <option value={"De Neve - Plaza"}>De Neve - Plaza</option>
                            <option value={"Dykstra Hall"}>Dykstra Hall</option>
                            <option value={"Hedrick Hall"}>Hedrick Hall</option>
                            <option value={"Hedrick Summit"}>Hedrick Summit</option>
                            <option value={"Hitch  Suites"}>Hitch Suites</option>
                            <option value={"Olympic Hall"}>Olympic Hall</option>
                            <option value={"Rieber Hall"}>Rieber Hall</option>
                            <option value={"Rieber Terrace"}>Rieber Terrace</option>
                            <option value={"Rieber Vista"}>Rieber Vista</option>
                            <option value={"Saxon Suites"}>Saxon Suites</option>
                            <option value={"Sproul Cove"}>Sproul Cove</option>
                            <option value={"Sproul Hall"}>Sproul Hall</option>
                            <option value={"Sproul Landing"}>Sproul Landing</option>
                        </Select>
                </FormControl>

                {/* pick favorite dining hall */}
                <FormControl mt={3}>
                    <FormLabel>Favorite Dining Hall</FormLabel>
                        <Select {...register("favDining")} placeholder={user.dining  + " (current)"}>
                            <option value={"Not Specified"}>Not Specified</option>
                            <option value={"Anywhere"}>Anywhere</option>
                            <option value={"Epicuria"}>Epicuria</option>
                            <option value={"De Neve"}>De Neve</option>
                            <option value={"Bplate"}>Bplate</option>
                            <option value={"Rende"}>Rende</option>
                            <option value={"Bcafe"}>Bcafe</option>
                            <option value={"The Study"}>The Study</option>
                            <option value={"The Drey"}>The Drey</option>
                            <option value={"Epicuria Ackerman"}>Epicuria at Ackerman</option>
                            <option value={"Food Truck"}>Food Truck</option>
                            <option value={"ASUCLA"}>ASUCLA Ticket</option>
                        </Select>
                </FormControl>

                {/* pick meal plan */}
                <FormControl mt={3}>
                    <FormLabel>Meal Plan</FormLabel>
                        <Select {...register("mealPlan")} placeholder={user.mealPlan + " (current)"}>
                            <option value={"Not Specified"}>Not Specified</option>
                            <option value={"No Meal Plan"}>No Meal Plan</option>
                            <option value={"11R"}>11R</option>
                            <option value={"11P"}>11P</option>
                            <option value={"14R"}>14R</option>
                            <option value={"14P"}>14P</option>
                            <option value={"19R"}>19R</option>
                            <option value={"19P"}>19P</option>
                        </Select>
                </FormControl>

                {/* payment preference */}
                <FormControl mt={3}>
                    <FormLabel>Payment Preference</FormLabel>
                    <Select {...register("payment")} placeholder={user.payment  + " (current)"}>
                            <option value={'Not Specified'}>Not Specified</option>
                            <option value={'Cash'}>Cash</option>
                            <option value={'Zelle'}>Zelle</option>
                            <option value={'Venmo'}>Venmo</option>
                    </Select>
                </FormControl>
                  
                <Button type="submit" colorScheme='blue' color='yellow' mt="5" mr={3}>
                  Save
                </Button>
                <Button mt="5" onClick={onClose}>Cancel</Button>
              
            </form>
            </Box>
        </ModalBody>

              </ModalContent>
              {/* provides the modal body */}
          </Modal>

      </>
  )
}

export default EditProfileModal;