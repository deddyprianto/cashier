'use client';
import { setDataProductPresetItem } from '@/features/dataSlice';
import { handledData } from '@/helper';
import { useAppDispatch, useAppSelector } from '@/hooks';
import React, { useState } from 'react';
import { Popup } from './Popup';
import Link from 'next/link';

interface ProductPresetItemDataType {
  data: [];
  status: string;
}

interface ItemFormatData {
  id: string;
  name: string;
  itemType: string;
}
interface PropsProductItem {
  product: {
    data: ItemFormatData[];
  };
  idOutlet: string;
  token?: string;
}
const ProductsItem: React.FC<PropsProductItem> = ({
  product,
  idOutlet,
  token,
}) => {
  console.log(token);
  const products = useAppSelector((state) => state.data.productPresetItem);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = async (item: { name: string; id: string }) => {
    if (!token) {
      return setIsOpen(true);
    }
    setIsOpen(true);
    setIsLoading(true);
    const { data } = await handledData<ProductPresetItemDataType>({
      baseURL: process.env.NEXT_PUBLIC_BASE_URL_API_PRODUCT_PRESET_API,
      endPoint: `loaditems/webOrdering/${idOutlet}/${item.id}`,
      method: 'POST',
      payload: { skip: 0, take: 10 },
    });
    setIsLoading(false);
    if (data) {
      dispatch(setDataProductPresetItem(data?.data));
    }
  };
  return (
    <div className='flex flex-col justify-start'>
      {product.data.map((item) => {
        return (
          <button
            key={item.id}
            onClick={() => handleClick(item)}
            className='py-5 hover:bg-slate-500 cursor-pointer hover:text-white'
          >
            {item.name}
          </button>
        );
      })}
      <Popup fullScreen={false} isOpen={isOpen} setIsOpen={setIsOpen}>
        {!token ? (
          <Link href='/login'>
            <div className='underline text-center p-10 text-rose-600'>
              Please Login First
            </div>
          </Link>
        ) : (
          <div className='p-10 flex flex-col'>
            {isLoading ? (
              <div className='w-full h-full flex justify-center items-center'>
                <div className='loaderCustom'></div>
              </div>
            ) : (
              products.map((item) => {
                return (
                  <button
                    onClick={async () => {
                      const payload = {
                        outletID: `outlet::${idOutlet}`,
                        details: [
                          {
                            productID: item.productID,
                            unitPrice: 5,
                            quantity: 1,
                            remark: '',
                          },
                        ],
                      };
                      try {
                        const response = await handledData({
                          baseURL:
                            'https://api-newmujicafe.proseller-demo.com/ordering/api/',
                          endPoint: 'cart/additem',
                          method: 'POST',
                          payload,
                          token: token,
                        });
                      } catch (error) {
                        alert(error);
                        console.log(error);
                      }
                    }}
                    className='mt-3 hover:bg-slate-500'
                    key={item.id}
                  >
                    {item.name}
                  </button>
                );
              })
            )}
          </div>
        )}
      </Popup>
    </div>
  );
};

export default ProductsItem;
