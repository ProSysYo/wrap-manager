import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../api/api';

interface DoorState {
    doors: any[]
}

const initialState: DoorState = {
    doors: []
}

export const getDoors = createAsyncThunk(
    "door/getDoors",
    async (_, thunkAPI) => {
        try {
            const res = await api.getDoors()
            return {data: res.data};
        } catch (e) {
            console.log(e);            
        }
    }
)

export const doorSlice = createSlice({
    name: "door",
    initialState,
    reducers: {

    },
    extraReducers: (bilder) => {
        bilder
            .addCase(getDoors.fulfilled, (state, action) => {
                state.doors = action.payload?.data
            })
    }
})

export const doorActions = doorSlice.actions;

export default doorSlice.reducer;