import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface UserLoginDataType {
  email: string;
  phoneNumber: string;
}
interface DataState {
  dataUserLogin: UserLoginDataType;
}

const initialState: DataState = {
  dataUserLogin: {
    email: '',
    phoneNumber: '',
  },
};

export const dataSlice = createSlice({
  name: 'dataSlice',
  initialState,
  reducers: {
    setDataUser: (state, action: PayloadAction<UserLoginDataType>) => {
      state.dataUserLogin = action.payload;
    },
  },
});

export const { setDataUser } = dataSlice.actions;
export default dataSlice.reducer;
