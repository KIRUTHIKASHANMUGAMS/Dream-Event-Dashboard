import React, 
{ createContext, useEffect,useState } from 'react';
import Cookies from "universal-cookie";

import { loginResponse } from "../server/login";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const cookies = new Cookies();

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = cookies.get('user'); 
            
            if (userId) {
                try {
                    const userData = await loginResponse(userId);
                    setUser(userData);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        };

        fetchUserData();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
