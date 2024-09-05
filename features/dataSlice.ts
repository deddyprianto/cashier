import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface UserLoginDataType {
  email?: string;
  phoneNumber: string;
}

interface ProductPresetItemDataType {
  name: string;
  sequence: number;
  itemType: string;
  id: string;
  productID: string;
  product: Record<string, any>;
}

interface ModifiersCartDetails {
  modifierID: string;
}
interface CartDetails {
  unitPrice: number;
  modifiers: ModifiersCartDetails[];
}
interface Cart {
  cartID: string;
  details: CartDetails[];
  outletID: string;
  totalNettAmount: number;
}

interface DataState {
  dataUserLogin: UserLoginDataType;
  productPresetItem: ProductPresetItemDataType[];
  getCart: Cart;
}

const initialState: DataState = {
  dataUserLogin: {
    email: '',
    phoneNumber: '',
  },
  productPresetItem: [],
  getCart: {
    details: [],
    outletID: '',
    totalNettAmount: 0,
    cartID: '',
  },
};

export const dataSlice = createSlice({
  name: 'dataSlice',
  initialState,
  reducers: {
    setDataUser: (state, action: PayloadAction<UserLoginDataType>) => {
      state.dataUserLogin = action.payload;
    },
    setDataProductPresetItem: (
      state,
      action: PayloadAction<ProductPresetItemDataType[]>
    ) => {
      state.productPresetItem = action.payload;
    },
  },
});

export const { setDataUser, setDataProductPresetItem } = dataSlice.actions;
export default dataSlice.reducer;
