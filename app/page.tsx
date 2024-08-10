import HomeCP from '@/components/Home';
import React from 'react';

async function getData() {
  const resLoadOutlets = await fetch(
    'https://jsonplaceholder.typicode.com/todos/1',
    {
      cache: 'no-store',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );

  return resLoadOutlets.json();
}

export default async function Home() {
  return <HomeCP />;
}
