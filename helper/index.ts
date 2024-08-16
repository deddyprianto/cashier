interface HandledDataParams {
  payload?: Record<string, string>;
  endPoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
}
interface HandledDataResponse<T = any> {
  status: string;
  data?: T;
  error?: string;
}
export const handledData = async <T>({
  payload,
  endPoint,
  method = 'GET',
}: HandledDataParams): Promise<HandledDataResponse<T>> => {
  try {
    const responseRegisterUser = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}${endPoint}`,
      {
        method,
        body: JSON.stringify(payload),
        headers: {
          'Content-type': 'application/json',
          // Add authentication headers if needed
        },
      }
    );
    const responseJson = await responseRegisterUser.json();
    if (!responseRegisterUser.ok) {
      throw new Error(responseJson.message || 'Registration failed');
    }
    return { status: '', data: responseJson };
  } catch (error) {
    return {
      status: '',
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};
