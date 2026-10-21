import React,{createContext,useContext,useState,useEffect} from "react";
import {checkAuthStatus, logoutUser} from "../api/api";

const AuthContext = createContext(null);

export function AuthProvider({children})
{
    const [user, setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const isLoggedIn = !!user;

    const handleLogout = async () =>
    {
        try
        {
            await logoutUser();
        }
        catch (err)
        {
            console.log("Błąd wylogowania:",err);
        }
        finally
        {
            setUser(null);
        }
    };
    useEffect(() =>
    {
        const verifyUser = async ()=>
        {
            try
            {
                const data = await checkAuthStatus();
                setUser(data);
            }
            catch (err)
            {
                setUser(null)
            }
            finally {
                setLoading(false)
            }
        };
        verifyUser();
    }, []);
    return(<AuthContext.Provider value={{user,isLoggedIn,loading,handleLogout,setUser}}>
        {children}
    </AuthContext.Provider> )
}
export function useAuth(){
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth musi być użyte wewnątrz AuthProvider')
    }
    return context;
}
