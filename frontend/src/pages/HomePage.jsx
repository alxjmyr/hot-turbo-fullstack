import { useTheme } from "@/contexts/ThemeContext";

const Home = () => {
    const { theme } = useTheme();

    return (
        <div className="grid place-items-center h-screen">

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
    )
};

export default Home;