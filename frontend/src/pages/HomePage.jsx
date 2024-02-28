import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

const Home = () => {
    const { theme } = useTheme();

    return (
        <>
            <div className="grid place-items-center h-screen">
                <div>
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
                    <Button className="mr-5"><a href="/signup">Sign Up</a></Button>
                    <Button className="ml-5"><a href="/login">Login</a></Button>
                </div>

            </div>

        </>

    )
};

export default Home;