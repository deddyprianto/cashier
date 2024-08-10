'use server';

export async function createInvoice(formData: FormData) {
  const rawFormData = {
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  };

  console.log('Invoice created:', rawFormData);

  // Di sini Anda bisa menambahkan logika untuk menyimpan ke database
  // atau melakukan operasi lain
}
