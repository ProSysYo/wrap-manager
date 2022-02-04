import { http } from './http';

const login = (data: { login: string, password: string }) => {
    console.log("http login");
    
    return http.post("/auth/login", data)
}

const authentication = () => {
    return http.get("/auth/auth")
}

const markDate = (data: { serial: string, field: string }) => {
    return http.post("/door/markDate", data)
}

const markDateWarehouse = (data: { serial: string, codeOtdelochnik: string }) => {
    return http.post("/door/markDateWarehouse", data)
}

const packagePanels = (data: string[]) => {
    return http.post("/panelout/packagePanels", data)
}

export const api = {    
    login,
    authentication,
    markDate,
    markDateWarehouse,
    packagePanels
}