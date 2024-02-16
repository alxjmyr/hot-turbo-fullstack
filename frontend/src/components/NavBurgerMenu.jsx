import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button"

import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import ThemeToggle from "./ThemeMenu";

const NavBurgerMenu = (items) => {
    // const opts = items;

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
                    <ThemeToggle />
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
};

export default NavBurgerMenu;