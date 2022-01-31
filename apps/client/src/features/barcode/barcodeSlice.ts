import {  createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface BarcodeState {
    zone: string | null;    
    status: "idle" | "loading" | "failed";
    simpleCode: string 
}

const initialState: BarcodeState = {
    zone: null,    
    status: "idle",
    simpleCode: "",
};


export const barcodeSlice = createSlice({
    name: "barcode",
    initialState,
    reducers: {
        setZone: (state, action: PayloadAction<string>) => {            
            state.zone = action.payload                       
        },
        setSimpleCode: (state, action: PayloadAction<string>) => {            
            state.simpleCode = action.payload                       
        }
    },
    extraReducers: () => {        
                 
    }
});

export const barcodeActions = barcodeSlice.actions;

export default barcodeSlice.reducer;
