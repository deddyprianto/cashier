'use client';
import { useAppSelector } from '@/hooks';

const Home = () => {
  const { accessToken } = useAppSelector(
    (state) => state.dataPersist.accessTokenData
  );
  const { email } = useAppSelector((state) => state.data.dataUserLogin);
  console.log(email);
  console.log(accessToken);
  return <div>Home</div>;
};

export default Home;
