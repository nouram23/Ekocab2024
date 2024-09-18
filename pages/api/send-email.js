// pages/api/send-email.js

import nodemailer from 'nodemailer';
import * as XLSX from 'xlsx';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Create an Excel file
    const tableData = [
      { id: 1, location: '452 Willoughby Road', day: '10/09/24', hour: '8', cost: '35' },
      { id: 2, location: '452 Willoughby Road', day: '11/09/24', hour: '8', cost: '35' },
    ];

    const updatedTableData = tableData.map(row => ({
      ...row,
      salary: (parseFloat(row.hour) * parseFloat(row.cost)).toFixed(2),
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(updatedTableData);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    // Create a transport object using your SMTP server details
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // or another email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to: email,
      subject: 'Your Excel File',
      text: 'Please find the attached Excel file.',
      attachments: [
        {
          filename: 'table-data.xlsx',
          content: excelBuffer,
          encoding: 'base64',
        },
      ],
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
