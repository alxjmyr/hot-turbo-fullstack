import { useContext } from "react";
import NavBurgerMenu from "./NavBurgerMenu";
import { Button } from "@/components/ui/button"
import ThemeToggle from "./ThemeMenu";
import { ExitIcon, PersonIcon } from "@radix-ui/react-icons";

import { useTheme } from '../contexts/ThemeContext'
import { UserContext } from "@/contexts/UserContext";

import { NavRouteList } from "@/AppRoutes";

const routeFilter = (route, token) => {
    if (token && route.requiresAuth) {
        return true;
    };

    if (token && route.showToLoggedIn) {
        return true;
    }
    if (!token && !route.requiresAuth) {
        return true;
    };

    return false;
};

const getFilteredRoutes = (routeList, token) => {
    const filterOutput = routeList.filter(element => routeFilter(element, token))
    return filterOutput
};

const MainNav = () => {
    const { token, setToken } = useContext(UserContext)
    const { theme } = useTheme();

    const handleLogOut = () => {
        setToken("");
        localStorage.setItem("turboToken", "");
    };


    return (
        <nav
            className="border-b w-full"
        >
            <div className="items-center justify-between px-1 max-w-screen-xl mx-auto md:flex md:px-8">
                <div className="flex items-center justify-between md:block">
                    {theme === 'light' ? (
                        <a href="/home">
                            <img
                                src="turbo-sketch.svg"
                                alt="Turbo Charger"
                                width="85px"
                                height="85px"
                            />
                        </a>

                    ) : (
                        <a href="/home">
                            <img
                                src="turbo-sketch-white.svg"
                                alt="Turbo Charger"
                                width="85px"
                                height="85px"
                            />
                        </a>

                    )}
                    <div className="md:hidden">
                        <NavBurgerMenu items={getFilteredRoutes(NavRouteList, token)} />
                    </div>
                </div>

                <div
                    className="hidden md:visible pb-3 mt-8 md:block md:pb-0 md:mt-0"
                >
                    {/* {NavRouteList.map((item, idx) => (
                        <Button key={idx} variant="ghost">
                            <a href={item.path}>{item.title}</a>
                        </Button>
                    ))} */}
                    {getFilteredRoutes(NavRouteList, token).map((item, idx) => (
                        <Button key={idx} variant="ghost">
                            <a href={item.path}>{item.title}</a>
                        </Button>
                    ))}
                </div>
                <div className="hidden md:visible pb-3 mt-8 md:flex md:pb-0 md:mt-0">
                    {token &&
                        <>
                            <div className="inline">
                                <Button variant="ghost" size="sm" onClick={() => handleLogOut()}><ExitIcon /></Button>
                            </div>
                            <div className="inline">
                                <Button variant="ghost" size="sm"><a href="/profile"><PersonIcon /></a></Button>
                            </div>
                        </>
                    }
                    <div className="inline">
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default MainNav;

