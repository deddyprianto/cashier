import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import dataSlice from '@/features/dataSlice';
import dataSlicePersisted from '@/features/dataSlicePersisted';

// Define the persist configuration for only dataSlicePersisted
const persistConfig = {
  key: 'dataPersist', // Change the key to something specific for this slice
  storage,
};

// Apply the persistReducer to the dataSlicePersisted only
const persistedDataSlicePersisted = persistReducer(
  persistConfig,
  dataSlicePersisted
);

// Combine reducers
const rootReducer = combineReducers({
  data: dataSlice,
  dataPersist: persistedDataSlicePersisted, // Only this slice is persisted
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
