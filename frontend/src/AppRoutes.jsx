import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/HomePage";
import About from "./pages/AboutPage";
import NotFound from "./pages/NotFoundPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProtectedPage from "./pages/ProtectedPage";
import PrivateRoute from "./components/PrivateRoute";


export const NavRouteList = [
    { title: "Home", path: "/" },
    { title: "About Us", path: "/about" },
    { title: "Sign Up", path: "/signup" },
    { title: "Log In", path: "/login" },
    { title: "Protected Page", path: "/protected" }
]

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Navigate to="/" />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                {/* Protected Routes (requires auth / login) */}
                <Route element={<PrivateRoute />}>
                    <Route path="/protected" element={<ProtectedPage />} />
                </Route>
                {/* Error not found fall back */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;