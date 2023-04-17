import { CHATROOMS } from "../../lib/routes.js";
import { HashRouter, Link as RouterLink } from "react-router-dom";
import { PROTECTED } from "../../lib/routes";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Stack,
    Heading,
    Text,
    Button,
    ButtonGroup,
    Flex,
    Avatar,
    Box,
    Link
} from '@chakra-ui/react'

import { db } from "../../lib/firebase.js";
import { collection, deleteDoc, doc, addDoc, getDocs, updateDoc } from "firebase/firestore";
import { useAuth } from '../../hooks/auth'

function ListingCard({ listing }) {

    const { user, isLoading } = useAuth();

    if (isLoading) return "Loading...";

    const deleteListing = async (id) => {
        const listingDoc = doc(db, "listings", id);
        await deleteDoc(listingDoc);
    };

    const handleCreate = async () => {
        const currentDate = new Date();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();
        const year = currentDate.getFullYear();
        const withSlashes = [month, day, year].join('/');

        const chatsRef = collection(db, "chats");
        const data = await getDocs(chatsRef);
        const chats = data.docs.map((doc) =>({...doc.data(), id: doc.id}));
        const chatDoesExist = false;
        chats.forEach((chat) => {if ((chat.chatter1 === user.username || chat.chatter1 === listing.listerUsername) && 
                                    (chat.chatter2 === user.username || chat.chatter2 === listing.listerUsername)) {chatDoesExist = true}});

        if (!chatDoesExist) {
            const { id } = await addDoc(collection(db, "chats"), {
                chatter1: user.username,
                chatter2: listing.listerUsername,
                isNewChat: true,
                date: withSlashes
            })
            const chatDoc = doc(db, "chats", id)
            const newFields = {test: id}
            await updateDoc(chatDoc, newFields)
        }


    }

    return (
        <div>
            <Card boxShadow='md' border="2px" borderColor="yellow.300">
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar src={listing.avi} />
                            <Box>
                                <Link as={RouterLink} to={`${PROTECTED}/profile/${listing.listerid}`}>{listing.listerUsername}</Link>
                                <Text>{listing.timePosted}</Text>
                            </Box>
                        </Flex>
                    </Flex>
                </CardHeader>

                <CardBody>
                    <Stack>
                        <Heading size='md'>{listing.listingType + "ing"}</Heading>
                        <Text>{listing.mealPeriod} swipe for {listing.location}</Text>
                        <Text>{"$" + listing.price}</Text>
                    </Stack>
                </CardBody>

                <CardFooter>
                    <ButtonGroup>
                        {listing.listerUsername !== user.username &&
                            <Link as={RouterLink} to={CHATROOMS} style={{ textDecoration: 'none' }}>
                                <Button colorScheme='blue' color='yellow' onClick={() => { handleCreate() }}> Contact {listing.listingType}er </Button>
                            </Link>

                        }
                        {listing.listerUsername === user.username &&
                            <Button onClick={() => { deleteListing(listing.id) }} colorScheme='red' variant='outline'> Remove </Button>
                        }
                    </ButtonGroup>
                </CardFooter>
            </Card>
        </div>
    );


}

export default ListingCard;