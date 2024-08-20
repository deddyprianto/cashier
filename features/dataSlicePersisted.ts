import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AccessTokenDataType {
  isLogin: boolean;
}
interface DataState {
  accessTokenData: AccessTokenDataType;
}

const initialState: DataState = {
  accessTokenData: {
    isLogin: false,
  },
};

export const dataSlicePersisted = createSlice({
  name: 'dataSlicePersisted',
  initialState,
  reducers: {
    setInfoToken: (state, action: PayloadAction<AccessTokenDataType>) => {
      state.accessTokenData = action.payload;
    },
  },
});

export const { setInfoToken } = dataSlicePersisted.actions;
export default dataSlicePersisted.reducer;
