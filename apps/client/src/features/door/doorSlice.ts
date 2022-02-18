import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api";

interface DoorState {
    doors: any[];
    status: "idle" | "loading" | "failed";    
}

const initialState: DoorState = {
    doors: [],
    status: "idle",    
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
    reducers: {},
    extraReducers: (bilder) => {
        bilder
            .addCase(getDoors.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getDoors.fulfilled, (state, action) => {
                state.doors = action.payload?.data;
                // const codeCustomers = new Set<string>();
                // const nameCustomers = new Set<string>();
                // const baseLocks = new Set<string>();
                // const parties = new Set<string>();

                // action.payload!.data.forEach((el: any) => {
                //     codeCustomers.add(el.order.codeCustomer);
                //     nameCustomers.add(el.order.nameCustomer);
                //     baseLocks.add(el.order.baseLock);
                //     parties.add(el.order.party);
                // });

                // state.codeCustomerFilters = Array.from(codeCustomers)
                //     .sort()
                //     .map((el) => ({ value: el, text: el }));
                // state.nameCustomerFilters = Array.from(nameCustomers)
                //     .sort()
                //     .map((el) => ({ value: el, text: el }));
                // state.baseLockFilters = Array.from(baseLocks)
                //     .sort()
                //     .map((el) => ({ value: el, text: el }));

                state.status = "idle";
            })
            .addCase(getDoors.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export const doorActions = doorSlice.actions;

export default doorSlice.reducer;
