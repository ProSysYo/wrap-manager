import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { openNotification } from "../../common/notification";
import { api } from "../../api/api";
export interface BarcodeState {
    field: string | null;
    status: "idle" | "loading" | "failed";
    simpleCode: string;
    readedCodes: string[];
    codeOtdelochnik: string;
}

const initialState: BarcodeState = {
    field: null,
    status: "idle",
    simpleCode: "",
    readedCodes: [],
    codeOtdelochnik: "",
};

export const markDate = createAsyncThunk(
    "barcode/markDate",
    async (data: { serial: string; field: string }, { rejectWithValue }) => {
        try {
            const response = await api.markDate(data);
            openNotification("success", "Номер обработан");

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

export const markDateWarehouse = createAsyncThunk(
    "barcode/markDateWarehouse",
    async (data: { serial: string; codeOtdelochnik: string }, { rejectWithValue }) => {
        try {
            const response = await api.markDateWarehouse(data);
            openNotification("success", "Номер обработан");

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

export const barcodeSlice = createSlice({
    name: "barcode",
    initialState,
    reducers: {
        setZone: (state, action: PayloadAction<string>) => {
            state.field = action.payload;
        },
        setSimpleCode: (state, action: PayloadAction<string>) => {
            state.simpleCode = action.payload;
        },
        setCodeOtdelochnik: (state, action: PayloadAction<string>) => {
            state.codeOtdelochnik = action.payload;
        },
    },
    extraReducers: (bilder) => {
        bilder
        .addCase(markDate.fulfilled, (state, action) => {
            state.readedCodes.push(state.simpleCode);
            state.simpleCode = "";
            state.status = "idle"; 
        })
        .addCase(markDateWarehouse.fulfilled, (state, action) => {
            state.readedCodes.push(state.simpleCode);
            state.simpleCode = "";
            state.codeOtdelochnik= "";
            state.status = "idle"; 
        })
    },
});

export const barcodeActions = barcodeSlice.actions;

export default barcodeSlice.reducer;
