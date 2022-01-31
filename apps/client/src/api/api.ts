import { http } from './http';

const login = (data: { login: string, password: string }) => {
    console.log("http login");
    
    return http.post("/auth/login", data)
}

const authentication = () => {
    return http.get("/auth/auth")
}

const updateStatusDoor = (data: { serialDoor: string, zone: string }) => {
    return http.post("/door/updateStatus", data)
}

export const api = {    
    login,
    authentication,
    updateStatusDoor
}