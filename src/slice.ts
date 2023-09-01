import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface VendingMachineState {
  name: string | null;
  balance: number;
}

const initialState: VendingMachineState = {
  name: null,
  balance: 0.0,
};

export const vendingMachineSlice = createSlice({
  name: "vendingMachine",
  initialState,
  reducers: {
    updateBalance: (state, action: PayloadAction<number | null>) => {
      if (action.payload) {
        state.balance = +(state.balance + action.payload).toFixed(2);
      } else {
        state.balance = 0.0;
      }
    },
    setName: (state, action: PayloadAction<string | null>) => {
      state.name = action.payload;
    },
  },
});

export const { updateBalance, setName } = vendingMachineSlice.actions;
export default vendingMachineSlice.reducer;