interface Params {
  payload?: Record<string, any>;
  endPoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  baseURL: string | undefined;
  token?: string;
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
  baseURL,
  token,
}: Params): Promise<Response<T>> => {
  try {
    const response = await fetch(`${baseURL}${endPoint}`, {
      method,
      body: JSON.stringify(payload),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
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
