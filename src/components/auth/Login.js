
import { 
    Center,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    FormErrorMessage,
    Link,
    Text
 } from '@chakra-ui/react'

import { Link as RouterLink } from "react-router-dom"
import { DASHBOARD, REGISTER } from '../../lib/routes' 
import { useForm } from "react-hook-form"
import { emailValidate, passwordValidate } from '../../utils/form-validate';
import { useLogin } from '../../hooks/auth';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/auth';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {auth, googleProvider} from '../../lib/firebase'

export default function Login() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const {user, userLoading} = useAuth();

    useEffect(() => {
        if(!userLoading && user){
            navigate(DASHBOARD);
        }
    }, [pathname, user, userLoading, navigate]);


    const {login} = useLogin();
    const {register, handleSubmit, reset, formState: { errors }} = useForm();

    async function handleLogin(data) {
        const succeeded = await login({email: data.email, password: data.password, redirectTo: DASHBOARD});
        if(succeeded) reset();
    }



  return (
    <Center w="100%" h="100vh">
        <Box mx="1" maxW="md" p="9" borderWidth="1px" borderRadius="lg">
            <Heading mb="4" size="sm" color="blue.400" textAling="center">Log In to your Swipe-Me-In Account</Heading>

            <form onSubmit={handleSubmit(handleLogin)}>
                <FormControl isInvalid={errors.email} py="2">
                    <FormLabel>Email</FormLabel>
                    <Input type="email" placeholder="Enter your UCLA email" {...register('email', emailValidate)}/>
                    <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.password} py="2">
                    <FormLabel>Password</FormLabel>
                    <Input type="password" placeholder="Enter your Password" {...register('password', passwordValidate)}/>
                    <FormErrorMessage>{errors.password &&errors.password.message}</FormErrorMessage>
                </FormControl>
                <Button mt="4" type="submit" colorScheme="yellow" size="md" w="full"  loadingText="Logging in">Log In</Button>
                {/* isLoading={true} */}
            </form>
            <Text fontSize="xlg" align="center" mt="6">
                Don't have an account? {" "}
                <Link as={RouterLink} to={REGISTER} color="yellow.700" fontWeight="medium" textDecor="underline" hover={{background:"purple.100"}}>Register</Link> {" "}
                instead!
            </Text>
        </Box>
    </Center>
  )
}
