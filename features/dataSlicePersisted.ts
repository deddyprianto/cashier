import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AccessTokenDataType {
  accessToken: object;
  domainName: string;
  idToken: object;
  refreshToken: object;
  statusCustomer: boolean;
}
interface DataState {
  accessTokenData: AccessTokenDataType;
}

const initialState: DataState = {
  accessTokenData: {
    accessToken: {},
    domainName: '',
    idToken: {},
    refreshToken: {},
    statusCustomer: true,
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
