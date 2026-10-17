export interface User{
    name: string;
    email: string;
    image: string;
    role: string | null;
};


export interface Location{
    latitude: number;
    longitude: number;
    formattedAddress: string;
}

export interface AppContextType {
    user: User | null;
    loading: boolean;
    isAuth: boolean;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
    location: Location | null;
    city: string | null;
    fetchUser: () => Promise<void>;
}
