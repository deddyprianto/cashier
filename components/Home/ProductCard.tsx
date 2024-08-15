import Image from 'next/image';
import React from 'react';

interface ProductCardParams {
  imageSrc: string;
  title: string;
  description: string;
  price: number;
  discountPrice: number;
}
const ProductCard: React.FC<ProductCardParams> = ({
  imageSrc,
  title,
  description,
  price,
  discountPrice,
}) => {
  return (
    <div className='border rounded-lg shadow-lg p-4'>
      <Image
        src={imageSrc}
        alt={title}
        width={300}
        height={200}
        className='w-full h-48 object-cover rounded-t-lg'
      />
      <h3 className='text-lg font-semibold mt-4'>{title}</h3>
      <p className='text-gray-600 mt-2'>{description}</p>
      <div className='mt-4'>
        {discountPrice && (
          <p className='text-red-500 text-lg font-bold'>
            ${discountPrice}
            <span className='text-gray-500 line-through ml-2'>${price}</span>
          </p>
        )}
        {!discountPrice && (
          <p className='text-teal-600 text-lg font-bold'>${price}</p>
        )}
      </div>
      <button className='w-full mt-4 bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition duration-200'>
        Add to Cart
      </button>
    </div>
  );
};
export default ProductCard;
