'use client';
import { useAppSelector } from '@/hooks';
import ProductCard from './ProductCard';

const HomeCP = () => {
  const { isLogin } = useAppSelector(
    (state) => state.dataPersist.accessTokenData
  );

  if (isLogin) {
    return (
      <ProductCard
        description='lorem ipsum'
        imageSrc='/images/gallery4.jpeg'
        discountPrice={14}
        title='Sale night'
        price={20}
      />
    );
  } else {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='bg-white p-12 rounded-lg shadow-lg max-w-lg text-center'>
          <h2 className='text-3xl font-semibold text-gray-800'>
            Welcome Back!
          </h2>
          <p className='mt-6 text-lg text-gray-600'>
            To continue, please log in using the link in the navigation bar
            above.
          </p>
        </div>
      </div>
    );
  }
};

export default HomeCP;
