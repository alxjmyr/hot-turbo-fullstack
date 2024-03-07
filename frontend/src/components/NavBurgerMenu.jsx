import { useContext } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button"

import { HamburgerMenuIcon, ExitIcon, PersonIcon } from "@radix-ui/react-icons";
import ThemeToggle from "./ThemeMenu";
import { UserContext } from "@/contexts/UserContext";
import { Separator } from "./ui/separator";

const NavBurgerMenu = (items) => {
    // const opts = items;
    const { token, setToken } = useContext(UserContext)
    const handleLogOut = () => {
        setToken("");
        localStorage.setItem("turboToken", "");
    };

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="ghost">
                        <HamburgerMenuIcon />
                        <span className="sr-only">Nav Burger Menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="eng">
                    {
                        items.items.map((item, idx) => (
                            <DropdownMenuItem key={idx}>
                                <a href={item.path}>{item.title}</a>
                            </DropdownMenuItem>
                        ))
                    }
                    <Separator />
                    <div className="flex">
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


                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
};

export default NavBurgerMenu;