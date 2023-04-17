import ListingCard from './ListingCard.js'

import { SimpleGrid, Text } from '@chakra-ui/react'


function ListingsView(props) {

    const listings = props.listings;

    return (
        <SimpleGrid mt={4} spacing={4} mr={6} templateColumns='repeat(auto-fill, minmax(250px, 1fr))'>

            {listings?.length === 0 
            ? <Text fontSize="sm" width="95%" textAlign="center"> There are no listings for swipes.</Text>  : listings?.map((listing) => (
                <ListingCard listing={listing} />
            ))}

        </SimpleGrid>
    );
}

export default ListingsView;