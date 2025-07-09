This code provides a basic structure.  **Crucially, it omits the actual secure transaction handling.**  Integrating real payment gateways (Stripe, PayPal, Razorpay, etc.) requires their specific SDKs and API keys, and is beyond the scope of a single code example.  This example focuses on the React/Tailwind UI and the basic workflow.  You'll need to replace the placeholder comments with your actual payment gateway integration code.

```jsx
import React, { useState } from 'react';

function PaymentPage() {
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('');
  const [bookingStatus, setBookingStatus] = useState('Pending'); // Initially pending

  const handlePaymentOptionChange = (event) => {
    setSelectedPaymentOption(event.target.value);
  };

  const handlePayment = async () => {
    if (selectedPaymentOption === '') {
      alert('Please select a payment option.');
      return;
    }

    setBookingStatus('Processing...');

    // **REPLACE THIS WITH YOUR ACTUAL PAYMENT GATEWAY INTEGRATION**
    try {
      // Simulate API call to payment gateway
      const response = await simulatePayment(selectedPaymentOption); 
      if (response.success) {
        setBookingStatus('Successful');
        // Update booking status in your database or backend
      } else {
        setBookingStatus('Failed');
        // Handle payment failure appropriately
      }
    } catch (error) {
      console.error("Payment failed:", error);
      setBookingStatus('Failed');
    }
  };


  // Simulate a payment API call (REPLACE THIS)
  const simulatePayment = async (method) => {
    //  This would make an API call to your payment gateway.
    //  For example (using fetch):
    //  const response = await fetch('/api/payment', { method: 'POST', body: JSON.stringify({method, ...otherData})});
    //  return response.json();


    //  Simulate a successful payment (REMOVE THIS - it's only for demonstration)
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
    return { success: true };
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Payment</h2>
        <p className="mb-4">Please select your payment method:</p>

        <div className="mb-4">
          <label className="block mb-2">
            <input
              type="radio"
              value="upi"
              checked={selectedPaymentOption === 'upi'}
              onChange={handlePaymentOptionChange}
              className="mr-2"
            />
            UPI
          </label>
          <label className="block mb-2">
            <input
              type="radio"
              value="card"
              checked={selectedPaymentOption === 'card'}
              onChange={handlePaymentOptionChange}
              className="mr-2"
            />
            Credit/Debit Card
          </label>
          <label className="block mb-2">
            <input
              type="radio"
              value="wallet"
              checked={selectedPaymentOption === 'wallet'}
              onChange={handlePaymentOptionChange}
              className="mr-2"
            />
            Wallet
          </label>
        </div>

        <button
          onClick={handlePayment}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={bookingStatus !== 'Pending'}
        >
          {bookingStatus === 'Pending' ? 'Pay Now' : bookingStatus}
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;
```

Remember to install Tailwind CSS:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

And configure it in your project (refer to Tailwind CSS documentation for detailed instructions).  This example assumes you have a basic React project set up.  You'll need to adapt the styling to match your overall application design.  Again, the critical part missing is the secure payment integration – replace the placeholder comments with your payment gateway's code.  Always prioritize security when handling financial transactions.
