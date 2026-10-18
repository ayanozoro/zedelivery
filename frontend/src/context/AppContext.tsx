import { useEffect, useState } from "react";
import axios from "axios";
import type { ReactNode } from "react";
import type { Location, User } from "../types";
import { AppContext } from "./context";

interface AppContextProps {
    children: ReactNode;
}

export const AppProvider = ({ children }: AppContextProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);
    const [location] = useState<Location | null>(null);
    const [city] = useState<string | null>(null);

    async function fetchUser() {
        await Promise.resolve();

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                return;
            }

            setLoading(true);
            const { data } = await axios.get(
                `${import.meta.env.VITE_AUTH_SERVER_URL}/api/auth/user`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setUser(data.user);
            setIsAuth(true);
        } catch (error) {
            console.error("Failed to fetch user:", error);
            localStorage.removeItem("token");
            setUser(null);
            setIsAuth(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        queueMicrotask(() => {
            void fetchUser();
        });
    }, []);

    return (
        <AppContext.Provider
            value={{ user, loading, isAuth, setUser, setIsAuth, location, city, fetchUser }}
        >
            {children}
        </AppContext.Provider>
    );
};
