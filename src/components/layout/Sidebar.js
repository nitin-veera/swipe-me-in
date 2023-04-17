import React from 'react'
import { Box, Button, Code, Stack } from "@chakra-ui/react"
import { PROTECTED, USERS } from '../../lib/routes'
import { Link } from "react-router-dom"
import { useAuth } from '../../hooks/auth'
import Avatar from '../profile/Avatar'
import { FRIENDS } from '../../lib/routes'

import CreateListingModal from '../feed-components/CreateListingModal'


function ActiveUser() {
    const { user, isLoading } = useAuth();
    if (isLoading) return "Loading..."

    return (
        <Stack align="center" spacing="5" my="8">
            <Avatar user={user} />
            <Code>@{user.username}</Code>
            <Button colorScheme="gray" w="full" as={Link} to={`${PROTECTED}/profile/${user.id}`}>
                View Profile
            </Button>
            <CreateListingModal />
        </Stack>
    );
}


export default function Sidebar() {
    return (
        <Box
            px="6"
            height="100vh"
            w="100%"
            maxW="300px"
            borderLeft="3px solid"
            borderLeftColor="blue.300"
            position="sticky"
            top="16"
            display={{ base: "none", md: "block" }}
        >
            <ActiveUser />
            {/* <Box align="center">
                <Box as="ul" borderBottom="2px solid" borderColor="blue.200" />
                <Button
                    variant="outline"
                    colorScheme="yellow"
                    as={Link}
                    to={USERS}
                    mt="4"
                    size="sm"
                >
                    ALL USERS
                </Button>

            </Box>
            <Box align="center">
                <Button
                    variant="outline"
                    colorScheme="yellow"
                    as={Link}
                    to={FRIENDS}
                    mt="4"
                    size="sm"
                >
                    FRIENDS
                </Button>

            </Box> */}
        </Box>
    )
}
