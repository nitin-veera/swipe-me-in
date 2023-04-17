import { useState } from "react";

import ListingsView from '../components/feed-components/ListingsView.js'
import FilterListings from "../components/feed-components/FilterListings.js";
import { filterByQuery } from "../components/feed-components/FilterListings.js";

import { db } from "../lib/firebase.js";
import { collection } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { Heading } from '@chakra-ui/react'


function Feed() {

    const [filter, setFilter] = useState('All');

    const listingsRef = collection(db, "listings");

    let q = filterByQuery(filter, listingsRef);

    const [listings] = useCollectionData(q, { id: 'id' })

   

    return (
        <div>
            <Heading mt={4} paddingLeft="2" mb="4" size="lg" color="blue.300" textAling="center">Listings</Heading>
            <FilterListings filter={filter} setFilter={setFilter} />
            <ListingsView listings={listings} />
        </div >
    );
}

export default Feed;