import './ChatItems.css';
import { 
    Box,
    Text
 } 
 from '@chakra-ui/react'
import {useAuth} from "../../hooks/auth";

function ChatItem(props) {
    const { user, isLoading } = useAuth();

    console.log(props.username)

    var receivedFrom = "";
    if (user?.username === props.chatter1)
        receivedFrom = props.chatter2
    else
        receivedFrom = props.chatter1

    if (isLoading) return "Loading..."
    return (
        <ul className="ChatWith">
        <Box bg="blue.100" ml="14" mr="10" my="0" width="sm" maxW="unset" maxH="sm" p="2" borderWidth="1px" borderRadius="md"
        _hover={{
            border: "1px",
            borderColor: "blue.500",

        }}
        
        _focus={{
            border: "1px",
            borderColor: "black",

        }}

        _active={{
            bg: '#dddfe2',
            transform: 'scale(0.98)',
            borderColor: "blue.500",
        }}

        onClick={() => props.selectChat(props.id)}


>
        <li>
        
            {/* Might have to clear floats for this to work*/}
            {/* visit https://css-tricks.com/left-align-and-right-align-text-on-the-same-line/ */}
            <div>
                <span> 
                <Text fontSize="md"> {receivedFrom}
                </Text></span>
                
                <span>
                    <Text fontSize="sm">Date Created: {props.date}
                    </Text></span>
            </div>
        </li></Box></ul>
    );

}

export default ChatItem;