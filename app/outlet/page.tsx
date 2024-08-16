import OutletCP from '@/components/Outlet';

interface ApiResponse {
  data: [];
  dataLength: number;
  resultCode: number;
  status: string;
}

async function getData(baseUrl: string): Promise<ApiResponse> {
  const resLoadOutlets = await fetch(`${baseUrl}outlets/load`, {
    cache: 'no-store',
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return await resLoadOutlets.json();
}

export default async function Outlet() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API_MASTER_DATA;

  if (!baseUrl) {
    throw new Error(
      'Environment variable NEXT_PUBLIC_BASE_URL_API is not set.'
    );
  }
  const data: ApiResponse = await getData(baseUrl);
  return <OutletCP data={data.data} />;
}
