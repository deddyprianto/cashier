import HomeCP from '@/components/Home';

// async function getData() {
//   const resLoadCategory = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/data`
//   );

//   return await resLoadCategory.json();
// }
export default async function Home() {
  // const data = await getData();
  // console.log('DEDDY TAMPAN', data);
  return <HomeCP />;
}
