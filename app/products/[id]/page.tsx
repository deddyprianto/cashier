import ProductsItem from '@/components/ProductsItem';
import { cookies } from 'next/headers';
interface ProductPageParams {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const responseData = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL_API_MASTER_DATA}outlets/load`,
    {
      method: 'POST',
    }
  );
  const responseJson = await responseData.json();
  if (!Array.isArray(responseJson)) {
    return [];
  }

  return responseJson.map((product: { id: string }) => ({
    id: product.id.toString(),
  }));
}

async function getProduct(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL_API_PRODUCT_PRESET_API}loadcategory/webOrdering/${id}`,
    {
      cache: 'no-store',
    }
  );
  return res.json();
}

export default async function ProductPage({
  params,
}: Readonly<ProductPageParams>) {
  const cookieStore = cookies();
  const token = cookieStore.get('myToken');
  const product = await getProduct(params.id);
  return (
    <ProductsItem token={token?.value} product={product} idOutlet={params.id} />
  );
}
