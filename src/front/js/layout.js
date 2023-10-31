import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { NewAccount } from "./pages/register";
import { Login } from "./pages/login";
import { Protected } from "./pages/protected";

const Sesion = () => {
    const token = localStorage.getItem("token");
    return token !== null

};
const ProtectedRoute = ({ element }) => {
    return Sesion() ? element : <Navigate to="/" />;
};
//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    {/* <Navbar /> */}
                    <Routes>
                        <Route element={<ProtectedRoute element={<Protected />} />} path="/private" />
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route exact path="/registro" element={<NewAccount />} />
                        {/* <Route exact path="/private" element={<Protected />} /> */}
                        <Route exact path="/login" element={<Login />} />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    {/* <Footer /> */}
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
