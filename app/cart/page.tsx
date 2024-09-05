import CartItemCard from '@/components/CartItemCard';
import { cookies } from 'next/headers';

async function getData() {
  const cookieStore = cookies();
  const token = cookieStore.get('myToken');
  const resLoadCategory = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL_ORDERING}cart/getcart`,
    {
      cache: 'no-store',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${token?.value}`,
      },
    }
  );

  return await resLoadCategory.json();
}
export default async function Cart() {
  const data = await getData();
  if (data.status === 'NOTFOUND') {
    return <h1 className='text-center mt-5'>please add item to cart</h1>;
  } else {
    return <CartItemCard item={data?.data?.details} id={data?.data?.id} />;
  }
}
