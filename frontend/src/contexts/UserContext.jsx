import { createContext, useContext, useEffect, useState } from "react";

import { api } from "@/api_client/api";

export const UserContext = createContext();


export const UserProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem("turboToken"));
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            // console.log(token);
            api.getUser(token)
                .then(response => {
                    if (response.status !== 200 && token) {
                        console.log("no good, wiping token");
                        setToken("");
                        localStorage.setItem("turboToken", "")
                    } else {
                        setToken(token);
                        localStorage.setItem("turboToken", token);
                        setUserProfile({
                            email: response.data.email,
                            name: response.data.first_name,
                            is_active: response.data.is_active,
                            id: response.data.id
                        })
                    };
                })
                .catch(error => {
                    // console.log(token);
                    if (token) {
                        setToken("");
                        localStorage.setItem("turboToken", "")
                    };

                })
        };
        if (token) {
            fetchUser();
        }
    }, [token]);

    return (
        <UserContext.Provider value={{ token, setToken, userProfile, setUserProfile }}>
            {props.children}
        </UserContext.Provider>
    );
};

