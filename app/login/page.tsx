import React from 'react';
import { createRegisterUser } from './actions';
import Login from '@/components/Login';

export default async function login() {
  return <Login createRegisterUser={createRegisterUser} />;
}
