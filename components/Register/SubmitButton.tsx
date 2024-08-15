'use client';

import { useFormStatus } from 'react-dom';

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type='submit'
      disabled={pending}
      className={`w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm ${
        pending && 'opacity-50'
      }`}
    >
      {pending ? 'Please wait...' : 'Login'}
    </button>
  );
}
