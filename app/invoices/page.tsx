import { createInvoice } from './actions';

export default function InvoicePage() {
  return (
    <form action={createInvoice}>
      <input name='customerId' type='text' placeholder='Customer ID' />
      <input name='amount' type='number' placeholder='Amount' />
      <select name='status'>
        <option value='pending'>Pending</option>
        <option value='paid'>Paid</option>
      </select>
      <button type='submit'>Create Invoice</button>
    </form>
  );
}
