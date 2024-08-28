import PortalCP from '@/components/Portal';

export default async function Portal() {
  let data = await fetch(
    'https://64a7ca17dca581464b84c889.mockapi.io/students/family',
    {
      next: {
        tags: ['family'],
      },
    }
  );
  let posts = await data.json();
  return <PortalCP data={posts} />;
}
