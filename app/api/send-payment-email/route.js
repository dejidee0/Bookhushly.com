import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req) {
  try {
    const { to, bookingDetails } = await req.json();

    const msg = {
      to,
      from: process.env.SENDGRID_SENDER_EMAIL, // Must be a verified sender
      subject: "Payment Confirmation",
      html: `
        <h2>Hello ${bookingDetails.customerName}</h2>
        <p>Thanks for your payment for <strong>${bookingDetails.serviceTitle}</strong>.</p>
        <p>Amount: <strong>₦${bookingDetails.amount}</strong></p>
        <p>Ref: <strong>${bookingDetails.reference}</strong></p>
        <p><a href="${bookingDetails.bookingUrl}">View your booking</a></p>
      `,
    };

    await sgMail.send(msg);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[SENDGRID ERROR]", err);
    return NextResponse.json(
      { error: "Email sending failed" },
      { status: 500 }
    );
  }
}
