import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

import { UserContext } from "@/contexts/UserContext";

const Home = () => {
    const { theme } = useTheme();
    const { token } = useContext(UserContext);

    return (
        <>
            <div className="grid place-items-center h-screen">
                <div className="flex flex-col">
                    <div className="justify-center">
                        {theme === 'light' ? (
                            <img
                                src="turbo-sketch.svg"
                                alt="Turbo Charger"
                                width="250px"
                                height="250px"
                            />
                        ) : (
                            <img
                                src="turbo-sketch-white.svg"
                                alt="Turbo Charger"
                                width="250px"
                                height="250px"
                            />
                        )}
                    </div>
                    <div className={`grid ${token ? 'grid-cols-1' : 'grid-cols-2'} place-items-center`}>
                        {!token &&
                            <Button className="mr-5"><a href="/signup">Sign Up</a></Button>}

                        {!token &&
                            <Button className="ml-5"><a href="/login">Login</a></Button>}
                        {token &&
                            <Button><a href="/protected">Protected Page</a></Button>
                        }
                    </div>
                </div>

            </div >

        </>

    )
};

export default Home;