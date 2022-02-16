import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import barcodeReducer from "../features/barcode/barcodeSlice";
import doorReducer from "../features/door/doorSlice";

export const store = configureStore({
  reducer: {    
    auth: authReducer,
    barcode: barcodeReducer,
    door: doorReducer 
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
