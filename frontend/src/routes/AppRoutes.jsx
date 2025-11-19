import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import Profiles from "../pages/Profiles";
import SearchPage from "../pages/SearchPage";
import SearchResult from "../pages/SearchResult";
import PrivateRoute from "../services/Auth";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <PageNotFound />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            { 
                path: "profiles",
                element: <PrivateRoute><Profiles /></PrivateRoute>
            },
            {
                path:"search",
                element:<PrivateRoute><SearchPage /></PrivateRoute>
            },
            {
                path:"search:/search",
                element:<PrivateRoute><SearchResult /></PrivateRoute>
            },
            
        ]
    }
])