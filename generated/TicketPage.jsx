This solution requires several external libraries.  You'll need to install them using npm or yarn:

```bash
npm install qrcode.react tailwindcss react-router-dom
# or
yarn add qrcode.react tailwindcss react-router-dom
```

Then, assuming you have a Tailwind setup in your React project, here's the `TicketPage.js` component:

```jsx
import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { Link, useLocation } from 'react-router-dom';


const TicketPage = () => {
  const location = useLocation();
  const { ticketData } = location.state || {}; // Get data from previous page

  const [showConfirmation, setShowConfirmation] = useState(!!ticketData); // Show confirmation if ticketData exists

  if (!showConfirmation) {
    // Handle the case where there's no ticket data (e.g., payment failed)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="p-8 bg-white rounded shadow-md">
          <h1 className="text-2xl font-bold mb-4">Payment Failed</h1>
          <p>Please try again or contact support.</p>
          <Link to="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Go Back</Link>
        </div>
      </div>
    );
  }

  //Sample Ticket Data - replace with your actual data fetching mechanism
  const ticketInfo = ticketData || {
    event: "Concert",
    date: "2024-03-15",
    time: "7:00 PM",
    venue: "The Venue",
    seat: "A12",
    qrCodeData: "ThisIsASampleQRCodeData", // replace with actual QR code data.
    ticketId: "12345"
  };

  const downloadTicket = () => {
    //Create a hidden link and trigger a download.  This avoids issues with different browser's handling of direct data URLs.
    const link = document.createElement('a');
    link.href = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(generateSVG(ticketInfo))}`;
    link.download = `ticket_${ticketInfo.ticketId}.svg`;
    link.click();
  };

  const generateSVG = (ticketInfo) => {
      //Simple SVG generation -  Replace with a more robust and styled SVG generator for production.
      return `<svg width="200" height="200">
                <rect width="200" height="200" fill="lightblue"/>
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">${ticketInfo.event}</text>
                <text x="50%" y="60%" textAnchor="middle" dominantBaseline="middle">${ticketInfo.date} ${ticketInfo.time}</text>
              </svg>`;
  }


  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-8 bg-white rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Ticket Confirmation</h1>
        <div className="mb-4">
          <p><strong>Event:</strong> {ticketInfo.event}</p>
          <p><strong>Date:</strong> {ticketInfo.date}</p>
          <p><strong>Time:</strong> {ticketInfo.time}</p>
          <p><strong>Venue:</strong> {ticketInfo.venue}</p>
          <p><strong>Seat:</strong> {ticketInfo.seat}</p>
          <p><strong>Ticket ID:</strong> {ticketInfo.ticketId}</p>
        </div>
        <QRCode value={ticketInfo.qrCodeData} size={128} level="H" />
        <button onClick={downloadTicket} className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">Download Ticket</button>
        <Link to="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Go Back</Link>

      </div>
    </div>
  );
};

export default TicketPage;
```

Remember to replace the placeholder `ticketData` with your actual payment processing and ticket generation logic.  This example provides a basic framework; you'll likely need more sophisticated error handling, security measures, and a more visually appealing ticket design in a real-world application.  Consider using a proper SVG library or a server-side QR code generation for better results.  The `generateSVG` function is a rudimentary example and needs improvement.  Also,  remember to adjust routing in your app to correctly navigate to this page after successful payment.
