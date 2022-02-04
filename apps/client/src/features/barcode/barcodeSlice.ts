import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { openNotification } from "../../common/notification";
import { api } from "../../api/api";
export interface BarcodeState {
    field: string | null;
    status: "idle" | "loading" | "failed";
    simpleCode: string;
    readedCodes: string[];
    codeOtdelochnik: string;
    packagePanel: { numberLabel: number | null; panels: any[] };
}

const initialState: BarcodeState = {
    field: null,
    status: "idle",
    simpleCode: "",
    readedCodes: [],
    codeOtdelochnik: "",
    packagePanel: {
        numberLabel: null,
        panels: []
    },
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

export const packagePanels = createAsyncThunk("barcode/packagePanels", async (data: string[], { rejectWithValue }) => {
    try {
        const response = await api.packagePanels(data);
        openNotification("success", "Номера обработаны");

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
});

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
            .addCase(markDate.fulfilled, (state) => {
                state.readedCodes.push(state.simpleCode);
                state.simpleCode = "";
                state.status = "idle";
            })
            .addCase(markDateWarehouse.fulfilled, (state) => {
                state.readedCodes.push(state.simpleCode);
                state.simpleCode = "";
                state.codeOtdelochnik = "";
                state.status = "idle";
            })
            .addCase(packagePanels.fulfilled, (state, action) => {
                state.packagePanel.numberLabel = action.payload.data.numberLabel;
                state.packagePanel.panels = action.payload.data.panels;
            });
    },
});

export const barcodeActions = barcodeSlice.actions;

export default barcodeSlice.reducer;
