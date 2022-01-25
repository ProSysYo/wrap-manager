import { http } from './http';

const login = (data: { login: string, password: string }) => {
    return http.post("/auth/login", data)
}

export const api = {    
    login
}