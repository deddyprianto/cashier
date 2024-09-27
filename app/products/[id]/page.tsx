import ProductsItem from '@/components/ProductsItem';
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
    `${process.env.NEXT_PUBLIC_BASE_URL_API_PRODUCT_PRESET_API}loadcategory/webOrdering/${id}`
  );
  return res.json();
}

export default async function ProductPage({
  params,
}: Readonly<ProductPageParams>) {
  const product = await getProduct(params.id);
  return <ProductsItem product={product} idOutlet={params.id} />;
}
