'use client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store';
import React from 'react';

interface ProviderSessionsParams {
  children: React.ReactNode;
}

const ProviderSessions: React.FC<ProviderSessionsParams> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ProviderSessions;
