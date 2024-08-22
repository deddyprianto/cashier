interface Params {
  payload?: Record<string, string>;
  endPoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

interface Response<T = any> {
  status: string;
  data?: T;
  error?: string;
}

export const handledData = async <T>({
  payload,
  endPoint,
  method = 'GET',
}: Params): Promise<Response<T>> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}${endPoint}`,
      {
        method,
        body: JSON.stringify(payload),
        headers: {
          'Content-type': 'application/json',
        },
      }
    );
    const responseJson = await response.json();
    if (!response.ok) {
      throw new Error(responseJson.message || 'Request failed');
    }

    // Ensure data is returned correctly based on the expected type.
    return { status: 'success', data: responseJson };
  } catch (error) {
    return {
      status: 'error',
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};
