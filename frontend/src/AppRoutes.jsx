import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/HomePage";
import About from "./pages/AboutPage";
import NotFound from "./pages/NotFoundPage";

export const NavRouteList = [
    { title: "Home", path: "/" },
    { title: "About Us", path: "/about" }
]

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Navigate to="/" />} />
                <Route path="/about" element={<About />} />
                {/* Error not found fall back */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;