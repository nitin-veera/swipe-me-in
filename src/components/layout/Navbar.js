import { Button, Flex, Link } from "@chakra-ui/react";
import { CHATROOMS, DASHBOARD, FEED } from "../../lib/routes";
import { Link as RouterLink } from "react-router-dom";
import { useLogout } from "../../hooks/auth";

export default function Navbar() {
  const { logout, isLoading } = useLogout();

  return (
    <Flex
      shadow="sm"
      pos="fixed"
      width="full"
      borderTop="6px solid"
      borderTopColor="yellow.400"
      height="16"
      zIndex="3"
      justify="center"
      bg="F5FBFF"
      position="static"

    >
      <Flex px="4" w="full" align="center" maxW="1200px">
        <Link color="blue.500" as={RouterLink} to={DASHBOARD} fontWeight="bold">
          Swipe-Me-In Feed
        </Link>
        <Link color="blue.500" ml="100px" as={RouterLink} to={CHATROOMS}>
          ChatRooms
        </Link>

        <Button
          ml="auto"
          colorScheme="blue"
          color='yellow'
          size="sm"
          onClick={logout}
          isLoading={isLoading}
        >
          Logout
        </Button>
      </Flex>
    </Flex>
  );
}