import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../common/IUser";
import { openNotification } from "../../common/notification";
import { api } from "../../api/api";

export interface AuthState {
    isAuth: boolean | null;
    user: IUser | null;
    status: "idle" | "loading" | "failed";
}

const initialState: AuthState = {
    isAuth: false,
    user: null,
    status: "idle",
};

export const login = createAsyncThunk(
    "auth/login",
    async (data: { login: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await api.login(data);
            console.log(response);
            localStorage.setItem("token", response.data.token);
            openNotification("success", "Вход выполнен");            
            
            return {
                data: response.data,
            };
        } catch (error: any) {
            if (!error.isAxiosError) {
                throw error;                
            }            
            
            openNotification("error", error.response.data.message);
            return rejectWithValue(error.response.data);
        }
    }
);

export const authentication = createAsyncThunk(
    'auth/auth',
    async (_, {rejectWithValue}) => {
        try {
            const response = await api.authentication();            
            localStorage.setItem('token', response.data.token)
            
            return {
                data: response.data,            
            }
        } catch (error: any) {            
            if (!error.isAxiosError) {
                throw error
            }
            openNotification("error", error.response.data.message)
            return rejectWithValue(error.response.data)
        }        
    }
)

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token')
            state.user = null
            state.isAuth = false            
        }
    },
    extraReducers: (builder) => {        
        builder
            .addCase(login.pending, (state, action) => {                
                state.status = "loading";                
                              
            })          
            .addCase(login.fulfilled, (state, action) => {
                state.isAuth = true;
                state.status = "idle";                
                state.user = action.payload.data.user;                
            })
            .addCase(authentication.fulfilled, (state, action) => {
                state.isAuth = true;
                state.status = "idle";                
                state.user = action.payload.data.user;
            })           
    }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
