import React from 'react';
import { createRegisterUser } from './actions';
import Register from '@/components/Register';

export default async function login() {
  return <Register createRegisterUser={createRegisterUser} />;
}
