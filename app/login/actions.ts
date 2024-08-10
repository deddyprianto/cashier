'use server';

export async function createRegisterUser(formData: FormData) {
  const rawFormData = {
    email: formData.get('username'),
    phoneNumber: `+65${formData.get('mobilePhone')}`,
    password: 'Bd5ja7CQ',
    username: formData.get('username'),
    referralCode: '',
    dataType: 'text',
    defaultValue: '-',
    name: 'bima',
    smsNotification: true,
    emailNotification: true,
  };

  try {
    const responseRegisterUser = await fetch(
      'https://api-muji.proseller-dev.com/crm/api/customer/register',
      {
        method: 'POST',
        body: JSON.stringify(rawFormData),
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
    console.log(responseJson);
    return { success: true, data: responseJson };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}
