import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreConstant } from "../utils/enum/RouteConstant";
import { IFormData } from "../utils/interface/form.interface";

interface IStoreBillData {
  billFormData: IFormData[];
}

const initialState: IStoreBillData = {
  billFormData: [],
};

export const billSlice = createSlice({
  name: StoreConstant.BILL_DATA,
  initialState,
  reducers: {
    billData: (state, action: PayloadAction<IFormData>) => {
      state.billFormData = [...state.billFormData, action.payload];
    },
  },
});

export const { billData } = billSlice.actions;

export default billSlice.reducer;
