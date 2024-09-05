import { NextResponse } from 'next/server';
import axios from 'axios';
import serializeCustom from 'cookie';
import { COOKIE_NAME } from '@/constant';

const MAX_AGE = 43200;

interface LoginRequestBody {
  codeOTP: string;
  phoneNumber: string;
}

export async function POST(request: Request): Promise<Response> {
  const body: LoginRequestBody = await request.json();
  const { codeOTP, phoneNumber } = body;

  if (
    !codeOTP ||
    typeof codeOTP !== 'string' ||
    !phoneNumber ||
    typeof phoneNumber !== 'string'
  ) {
    return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
  }

  const payload = {
    codeOTP,
    phoneNumber,
  };

  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}customer/login`,
      payload,
      {
        headers: {
          'Content-type': 'application/json',
        },
      }
    );
    let token;
    try {
      token = data?.data?.accessToken?.token;
      if (!token) throw new Error('Token not found in response');
    } catch (error) {
      return NextResponse.json(
        { message: 'Invalid server response' },
        { status: 500 }
      );
    }

    const serialized = serializeCustom.serialize(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: MAX_AGE,
      path: '/',
    });

    const responseMessage = {
      message: 'Authenticated!',
    };

    return new Response(JSON.stringify(responseMessage), {
      status: 200,
      headers: { 'Set-Cookie': serialized },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message || 'Login failed' },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
