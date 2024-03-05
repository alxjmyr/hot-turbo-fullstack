import { useContext } from "react";

import { UserContext } from "@/contexts/UserContext";

const Profile = () => {
    const { userProfile } = useContext(UserContext);

    return (
        <>
            <p>This is the user profile</p>
            <p>{JSON.stringify(userProfile)}</p>
        </>


    )
};

export default Profile;