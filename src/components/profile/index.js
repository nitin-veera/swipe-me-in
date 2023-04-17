import {
  Button,
  Divider,
  Flex,
  HStack,
  Stack,
  Text,
  useDisclosure, 
  Card,
  CardHeader,
  CardBody,
  Heading,
  StackDivider,
  Box
} from "@chakra-ui/react";
import EditAvatar from "./EditAvatar";
import { useUpdateFriends, useUser } from "../../hooks/users";
import { useParams } from "react-router-dom";
import Avatar from "./Avatar";
import { useAuth } from "../../hooks/auth";
import format from "date-fns/format";
import EditProfileModal from "./EditProfileModal";

export default function Profile() {
  const { id } = useParams();
  const { user, isLoading: userLoading } = useUser(id);
  const { user: authUser, isLoading: authLoading } = useAuth();
  const { isOpen: isOpenAvatar, onOpen: onOpenAvatar, onClose: onCloseAvatar } = useDisclosure();

  const isFriend = authUser?.friends.includes(id);
  const { updateFriends, isLoading: updateFriendsLoading } = useUpdateFriends(authUser?.id, user?.id, isFriend);

  if (userLoading) return "Loading...";

  return (
    <Stack spacing="5">

      <Flex p={["4", "6"]} pos="relative" align="center">
        {/* displays user avatar */}
        <Avatar size="2xl" user={user} />
        {/* if the user is logged in and it's not loading, display this button */}
        {!authLoading && authUser.id === user.id &&  (
          <Button
            pos="absolute"
            mb="2"
            top="6"
            right="6"
            colorScheme="blue"
            color='yellow'
            onClick={onOpenAvatar}
          >
          Change Avatar
          </Button>
        )}
        {/* {!authLoading && authUser.id !== user.id && isFriend === false &&  (
          <Button
            pos="absolute"
            mb="2"
            top="4"
            right="6"
            colorScheme="yellow"
            onClick={updateFriends}
            isLoading={updateFriendsLoading}
          >
            Add Friend
          </Button>
        )}
          {!authLoading && authUser.id !== user.id && isFriend === true && (
          <Button
            pos="absolute"
            mb="2"
            top="4"
            right="6"
            colorScheme="blue"
            color="yellow"
            onClick={updateFriends}
            isLoading={updateFriendsLoading}
          >
            Remove Friend
          </Button>
        )} */}
        

        {/* displays account  */}
        <Stack ml="10">
          <Heading fontSize="2xl">{user.username}</Heading>
          <HStack spacing="10">
            <Text color="gray.700" fontSize={["sm", "lg"]}>
              Account Created: {format(user.date, "MMMM YYY")}
            </Text>
          </HStack>
        </Stack>

        <EditAvatar isOpen={isOpenAvatar} onClose={onCloseAvatar} />
      </Flex>

      <Divider />
      <Card>
        {/* button for opening a modal that lets you edit account details */}
        {!authLoading && authUser.id === user.id && (
          <EditProfileModal/>
        )}

        
        <CardHeader>
          <Heading color="blue.500" size='md'>Account Details</Heading>
        </CardHeader>

        <CardBody>
          <Stack borderColor="blue.300" divider={<StackDivider />} spacing='4'>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Description
              </Heading>
              <Text pt='2' fontSize='sm'>
                {user.description}
              </Text>
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Building
              </Heading>
              <Text pt='2' fontSize='sm'>
              {user.building}
              </Text>
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
              Favorite dining hall
              </Heading>
              <Text pt='2' fontSize='sm'>
              {user.dining}
              </Text>
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
              Meal plan
              </Heading>
              <Text pt='2' fontSize='sm'>
              {user.mealPlan}
              </Text>
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
              Preferred payment
              </Heading>
              <Text pt='2' fontSize='sm'>
              {user.payment}
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </Stack>
  );
}