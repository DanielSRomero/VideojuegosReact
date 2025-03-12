import { createContext, useState } from "react";

export const TOKEN_KEY = 'TOKEN';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState({
        isLogged: false,
        email: '',
        id: 0,
        jwt: ''
    })

    const login = async (email, password) => {
        try{
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email, password
                })
            })
            const userToken = await response.json();
            if (response.status === 200) {
                console.log(userToken);
                localStorage.setItem(TOKEN_KEY, userToken.accessToken)
                setUser({
                    isLogged: true,
                    email: userToken.user.email,
                    id: userToken.user.id
                })
                return {error: false, data: 'Sesión iniciada correctamente'}
            } else {
                return {error: true, data: 'Usuario o contraseña incorrecta'};
            }
        } catch (error) {
            return {error: true, data: 'Usuario o contraseña incorrecta'};
        }
    }

    const logout = () => {
        setUser({
            isLogged: false,
            email: '',
            id: 0
        });
        localStorage.removeItem(TOKEN_KEY);
    }

    const register = async (email, password) => {
        try{
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email, password
                })
            })
            const userToken = await response.json();
            if (response.status === 201) {
                return {error: false, data: 'Usuario registrado correctamente'}
            } else {
                return {error: true, data: 'Error al registrar usuario'};
            }
        } catch (error) {
            return {error: true, data: 'Error al registrar el usuario'};
        }
    }

    return (
        <AuthContext.Provider value={{user, setUser, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider};
