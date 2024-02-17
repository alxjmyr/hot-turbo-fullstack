import NavBurgerMenu from "./NavBurgerMenu";
import { Button } from "@/components/ui/button"
import ThemeToggle from "./ThemeMenu";

import { useTheme } from '../contexts/ThemeContext'


const MainNav = (navItems) => {
    const { theme } = useTheme();
    const menuItems = navItems.navItems;

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
                        <NavBurgerMenu items={menuItems} />
                    </div>
                </div>

                <div
                    className="hidden md:visible pb-3 mt-8 md:block md:pb-0 md:mt-0"
                >
                    {menuItems.map((item, idx) => (
                        <Button key={idx} variant="ghost">
                            <a href={item.path}>{item.title}</a>
                        </Button>
                    ))}
                </div>
                <div className="hidden md:visible pb-3 mt-8 md:block md:pb-0 md:mt-0">
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
};

export default MainNav;

