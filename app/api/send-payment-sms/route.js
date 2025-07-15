export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { sendPaymentConfirmationSMS } from "@/lib/sms";

export async function POST(req) {
  try {
    const body = await req.json();
    const { phone, data } = body;

    if (!phone || !data) {
      return NextResponse.json(
        { success: false, error: "Missing phone or data" },
        { status: 400 }
      );
    }

    const result = await sendPaymentConfirmationSMS(phone, data);

    return NextResponse.json(result);
  } catch (error) {
    console.error("SMS API error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
