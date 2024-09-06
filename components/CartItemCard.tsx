import React from 'react';
interface ItemType {
  product: {
    defaultImageURL: string;
    name: string;
  };
  quantity: number;
  unitPrice: number;
  id: string;
}

interface PropsCartItemCard {
  item: ItemType[];
  id: string;
}
const CartItemCard: React.FC<PropsCartItemCard> = ({ item, id }) => {
  return item?.map((card) => {
    return (
      <div
        key={card.id}
        className='mt-6 flex items-center p-4 bg-white shadow-md rounded-lg space-x-4'
      >
        {/* Item Image */}
        <div className='w-24 h-24 flex-shrink-0'>
          <img
            src={card.product.defaultImageURL}
            width={96}
            height={96}
            className='object-cover rounded-lg'
          />
        </div>

        {/* Item Details */}
        <div className='flex-1'>
          {/* Item Name */}
          <h2 className='text-lg font-semibold text-gray-800'>
            {card.product.name}
          </h2>

          <p className='text-sm text-gray-500 mt-1'>Price: ${card.unitPrice}</p>

          {/* Quantity Selector */}
          <div className='mt-2'>
            <label
              className='text-sm text-gray-600 mr-2'
              htmlFor={`quantity-${card.quantity}`}
            >
              Quantity:
            </label>
            <select
              id={`quantity-${card.quantity}`}
              className='border rounded p-1'
              value={card.quantity}
            >
              {card.quantity}
            </select>
          </div>
        </div>

        {/* Remove Button */}
        <button className='text-red-500 hover:text-red-700 transition-colors'>
          Remove
        </button>
      </div>
    );
  });
};

export default CartItemCard;
