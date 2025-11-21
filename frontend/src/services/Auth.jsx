import { Navigate } from "react-router-dom"

const API_URL = import.meta.env.VITE_API_URL;

const cleanInvalidStorage = () => {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")

    if (token === "undefined" || token === "null" || !token) {
        localStorage.removeItem("token")
    }
    if (user === "undefined" || user === "null" || !user) {
        localStorage.removeItem("user")
    }
}

export const isAuthenticated = () => {
    cleanInvalidStorage()
    return localStorage.getItem("token") !== null
}

export const getLoggedUser = () => {
    cleanInvalidStorage()
    const usuario = localStorage.getItem("user")
    return usuario ? JSON.parse(usuario) : null
}

export const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
}

export const fetchLoggedUser = async (userId) => {
    const response = await fetch(`${API_URL}/usuarios/${userId}`)
    if (!response.ok) throw new Error("Erro ao buscar usuário")
    return await response.json()
}

export default function PrivateRoute({ children }) {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />
    }
    return children
}