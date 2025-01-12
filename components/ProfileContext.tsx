import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

// creating context
const ProfileContext = createContext<any | null>(null);

// Consumer Context
const useProfileContext = () => useContext(ProfileContext);

// Provider Context
const ProfileContextProvider = ({ children }: any) => {
    const [profileData, setProfileData] = useState<any>({
        userName: "WhatsApp User",
        userStatus: "Hey there! I am using WhatsApp.",
        userImage: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
    });

    useEffect(() => {
        AsyncStorage.getItem('profile').then((data: any) => {
            if (data) {
                setProfileData(JSON.parse(data));
            } else {
                setProfileData({
                    userName: "",
                    userStatus: "",
                    userImage: ""
                });
            }
        });
    }, []);

    const updateProfileData = async (data: any) => {
        setProfileData(data);
        await AsyncStorage.setItem('profile', JSON.stringify(data));
    };

    return (
        <ProfileContext.Provider value={{ profileData, updateProfileData }}>
            {children}
        </ProfileContext.Provider>
    );
};

export { ProfileContextProvider, useProfileContext };