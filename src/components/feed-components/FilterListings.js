import { query, where, orderBy } from "firebase/firestore";

import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    FormControl,
    FormLabel,
    Button,
    Stack,
    RadioGroup,
    Radio,
    Select
} from '@chakra-ui/react'

export default function FilterListings({ filter, setFilter }) {

    const clearFilters = async (e) => {
        e.preventDefault();

        setFilter('All');
    }

    return (
        <Accordion border="0.5px" borderColor="blue.300" allowToggle width="95%">
            < AccordionItem >
                <h2>
                    <AccordionButton>
                        <Box flex='1' textAlign='left'>
                            Filter Listings
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <form onSubmit={clearFilters}>
                        <FormControl>
                            <FormLabel>Listing Type</FormLabel>
                            <RadioGroup onChange={setFilter} value={filter}>
                                <Stack direction='row'>
                                    <Radio value='Buying'>Buying</Radio>
                                    <Radio value='Selling'>Selling</Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>

                        <FormControl mt={3}>
                            <FormLabel>Meal Period</FormLabel>
                            <RadioGroup onChange={setFilter} value={filter}>
                                <Stack direction='row'>
                                    <Radio value='Breakfast'>Breakfast</Radio>
                                    <Radio value='Lunch'>Lunch</Radio>
                                    <Radio value='Dinner'>Dinner</Radio>
                                    <Radio value='Late Night'>Late Night</Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>

                        <FormControl mt={3}>
                            <FormLabel>Location</FormLabel>
                            <Select placeholder='Select option' onChange={(e) => setFilter(e.target.value)} value={filter}>
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

                        <FormControl mt={3}>
                            <FormLabel>Sort By Price</FormLabel>
                            <RadioGroup onChange={setFilter} value={filter}>
                                <Stack direction='row'>
                                    <Radio value='lowToHigh'>Lowest to Highest</Radio>
                                    <Radio value='highToLow'>Highest to Lowest</Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>

                        <Button mt={4} type='submit' colorScheme='gray' width="full">Clear Filters</Button>
                    </ form>
                </AccordionPanel>
            </AccordionItem >
        </Accordion >
    );
}

export function filterByQuery(filter, listingsRef) {
    switch (filter) {
        case 'Buying':
            return query(listingsRef, where("listingType", "==", "Buy"));
        case 'Selling':
            return query(listingsRef, where("listingType", "==", "Sell"));
        case 'Breakfast':
            return query(listingsRef, where("mealPeriod", "==", "Breakfast"));
        case 'Lunch':
            return query(listingsRef, where("mealPeriod", "==", "Lunch"));
        case 'Dinner':
            return query(listingsRef, where("mealPeriod", "==", "Dinner"));
        case 'Late Night':
            return query(listingsRef, where("mealPeriod", "==", "Late Night"));
        case 'Anywhere':
            return query(listingsRef, where("location", "==", "Anywhere"));
        case 'Epicuria':
            return query(listingsRef, where("location", "==", "Epicuria"));
        case 'De Neve':
            return query(listingsRef, where("location", "==", "De Neve"));
        case 'Bplate':
            return query(listingsRef, where("location", "==", "Bplate"));
        case 'Rende':
            return query(listingsRef, where("location", "==", "Rende"));
        case 'Bcafe':
            return query(listingsRef, where("location", "==", "Bcafe"));
        case 'The Study':
            return query(listingsRef, where("location", "==", "The Study"));
        case 'The Drey':
            return query(listingsRef, where("location", "==", "The Drey"));
        case 'Epicuria Ackerman':
            return query(listingsRef, where("location", "==", "Epicuria Ackerman"));
        case 'Food Truck':
            return query(listingsRef, where("location", "==", "Food Truck"));
        case 'ASUCLA':
            return query(listingsRef, where("location", "==", "ASUCLA"));
        case 'lowToHigh':
            return query(listingsRef, orderBy("price"));
        case 'highToLow':
            return query(listingsRef, orderBy("price", "desc"));
        default:
            return query(listingsRef);
    }
}
