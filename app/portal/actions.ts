'use server';
import { revalidateTag } from 'next/cache';

export async function createNewUser(formData: FormData) {
  const rawFormData = {
    name: formData.get('name'),
    address: formData.get('address'),
  };
  await fetch('https://64a7ca17dca581464b84c889.mockapi.io/students/family', {
    method: 'POST',
    body: JSON.stringify(rawFormData),
    headers: {
      'Content-type': 'application/json',
    },
  });
  revalidateTag('family');
}
