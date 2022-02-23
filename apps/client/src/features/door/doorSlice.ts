import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import models from "../../json/models.json"

type Door = {
    model: string
}

type Tables = {
    models: any[]
}

interface DoorState {
    doors: any[];
    door: Door | {}
    tables: Tables
    status: "idle" | "loading" | "failed";
}

const initialState: DoorState = {
    doors: [],
    status: "idle",
    door: {},
    tables: {
        models: models
    }
};

export const getDoors = createAsyncThunk("door/getDoors", async (_, thunkAPI) => {
    try {
        const res = await api.getDoors();
        return { data: res.data };
    } catch (e) {
        console.log(e);
    }
});

export const doorSlice = createSlice({
    name: "door",
    initialState,
    reducers: {
        rebootDoors: (state) => {
            state.doors = []
        },
    },
    extraReducers: (bilder) => {
        bilder
            .addCase(getDoors.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getDoors.fulfilled, (state, action) => {
                state.doors = action.payload?.data;
                state.status = "idle";
            })
            .addCase(getDoors.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export const doorActions = doorSlice.actions;

export default doorSlice.reducer;
