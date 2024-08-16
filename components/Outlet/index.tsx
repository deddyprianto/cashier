import React from 'react';

interface DataStructure {
  id: string;
  orderingStatus: string;
  name: string;
}

interface OutletParams {
  data: DataStructure[];
}

const OutletCP: React.FC<OutletParams> = ({ data }) => {
  return (
    <div>
      {data.map((item) => {
        return (
          <div
            key={item.id}
            className='bg-white shadow-lg rounded-md grid grid-cols-2 mt-4 py-3 justify-items-center cursor-pointer'
          >
            {item.orderingStatus === 'AVAILABLE' ? (
              <div className='text-green-500'>Open</div>
            ) : (
              <div className='text-red-500'>Close</div>
            )}

            <h1>{item.name}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default OutletCP;
