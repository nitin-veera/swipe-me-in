import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { LOGIN } from "../../lib/routes";
import { useAuth } from "../../hooks/auth";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Flex, Box } from "@chakra-ui/react"

export default function Layout() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const {user, isLoading} = useAuth();

    useEffect(() => {
        if(!isLoading && pathname.startsWith("/protected") && !user){
            navigate(LOGIN);
        }
    }, [pathname, user, isLoading]);

    if(isLoading) { return "Loading..."}

  return(
  <>
    <Navbar />
    <Flex pb="12" mx="auto" w="full" maxW="1200px">
        <Box w="900px">
            <Outlet />
        </Box>
        <Sidebar />
    </Flex>
  </>);
}
