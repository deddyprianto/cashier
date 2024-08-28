interface PropMapsData {
  id: string;
  name: string;
  itemType: string;
}
interface ProductPageParams {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const responseData = await fetch(
    'https://api-chickyfun.proseller-demo.com/masterdata/api/outlets/load',
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
    `https://api-chickyfun.proseller-demo.com/product/api/productpreset/loadcategory/webOrdering/${id}`
  );
  return res.json();
}

export default async function ProductPage({
  params,
}: Readonly<ProductPageParams>) {
  const product = await getProduct(params.id);

  return (
    <div>
      {product?.data?.map((item: PropMapsData) => {
        return (
          <div key={item.id}>
            <ul>
              <li> Name Products: {item.name}</li>
              <li> Category Type: {item.itemType}</li>
            </ul>
            <hr className='divide-y-2 divide-red-500' />
          </div>
        );
      })}
    </div>
  );
}
