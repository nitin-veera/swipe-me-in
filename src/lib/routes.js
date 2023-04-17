import { createBrowserRouter } from "react-router-dom"

import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Dashboard from "../components/dashboard/dashboard";
import Layout from "../components/layout";
import Landing from "../Landing";
import Feed from "../pages/Feed";
import ChatRoomsPage from "../pages/ChatRooms";
import Profile from "../components/profile";
import Users from "../components/users";
import Friends from "../components/friends";

export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";
export const PROTECTED = "/protected"
export const DASHBOARD = "/protected/dashboard";
export const USERS = "/protected/users"
export const PROFILE = "/protected/profile/:id"
export const CHATROOMS = "/protected/chatrooms"
export const FRIENDS = "/protected/friends"

export const router = createBrowserRouter([
    { path: ROOT, element: <Landing /> },
    { path: LOGIN, element: <Login /> },
    { path: REGISTER, element: <Register /> },
    { 
        path: PROTECTED, element: <Layout />, children: [
            {
                path: DASHBOARD,
                element: <Feed />
            },
            {
                path: USERS,
                element: <Users />
            },
            {
                path: PROFILE,
                element: <Profile />
            },
            {
                path: CHATROOMS,
                element: <ChatRoomsPage />
            },
            {
                path: FRIENDS,
                element: <Friends />
            },
        ]
    }
])
