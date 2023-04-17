import { Button, Code, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useUser } from "../../hooks/users";
import { PROTECTED } from "../../lib/routes";
import Avatar from "../profile/Avatar";

export default function Friend({ friendid }) {
  const {user, isLoading} = useUser(friendid)

  if(isLoading) return "Loading...";

  return (
    <VStack
      bg="gray.100"
      shadow="sm"
      rounded="md"
      textAlign="center"
      p="4"
      spacing="3"
    >
      <Avatar user={user} />
      <Code>@{user.username}</Code>
      <Link>
        <Button
          as={Link}
          to={`${PROTECTED}/profile/${user.id}`}
          size="sm"
          variant="link"
          colorScheme="purple"
        >
          View Profile
        </Button>
      </Link>
    </VStack>
  );
}