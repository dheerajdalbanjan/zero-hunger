import { NextRequest, NextResponse } from "next/server";

type dataType = {
  name: string,
  email: string,
  message: string
}

const nodemailer = require('nodemailer')

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log(data)

  const { name, email, category, message, pricing, phone, coupon } = data;
  console.log(pricing)

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: false,

    auth: {
      user: 'zerohubger@gmail.com',
      pass: 'xetn wuvc thdq ayqn'
    }
  });

  const mailOptions = {
    from: 'zerohubger@gmail.com',
    to: data.donorEmail,
    subject: `Donation access email`,
    text: `Needy details:\nName: ${data.name}\nEmail: ${data.nemail}\n\nDonation Details:\nDonation Id: ${data._id}\nDonation title: ${data.title}\nDonation Description: ${data.description}\n\nReason for donation access by needy: ${data.reason}`
  };






  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response );
    return  NextResponse.json({message: 'success'}, {status: 200})
  } catch (error) {
    console.log(error);
    return new Response('Error', { status: 500 });
  }
}