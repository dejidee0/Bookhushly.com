// SMS service integration with Twilio
import twilio from "twilio";

const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

// Lazily get the Twilio client

const getTwilioClient = () => {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;

  if (!sid || !sid.startsWith("AC") || !token) {
    throw new Error("Invalid Twilio credentials: check SID and Auth Token");
  }

  return twilio(sid, token);
};

// SMS templates
const smsTemplates = {
  bookingConfirmation: (data) =>
    `🎉 Booking Confirmed! Your booking for ${data.serviceTitle} on ${data.bookingDate} has been confirmed. Ref: ${data.bookingId}. - Bookhushly`,

  bookingReminder: (data) =>
    `⏰ Reminder: Your booking for ${data.serviceTitle} is tomorrow at ${data.bookingTime}. Ref: ${data.bookingId}. - Bookhushly`,

  paymentConfirmation: (data) =>
    `✅ Payment Successful! ₦${data.amount} paid for ${data.serviceTitle}. Ref: ${data.reference}. - Bookhushly`,

  kycApproval: (data) =>
    `🎉 KYC Approved! Welcome to Bookhushly, ${data.vendorName}. You can now create listings and accept bookings. - Bookhushly`,

  kycRejection: (data) =>
    `❌ KYC Review Required. Please update your information and resubmit. Login to your dashboard for details. - Bookhushly`,

  otpVerification: (data) =>
    `Your Bookhushly verification code is: ${data.otp}. Valid for 10 minutes. Do not share this code. - Bookhushly`,

  passwordReset: (data) =>
    `🔐 Password reset requested for your Bookhushly account. Use this code: ${data.resetCode}. Valid for 15 minutes. - Bookhushly`,

  newBookingVendor: (data) =>
    `📋 New Booking! You have a new booking request for ${data.serviceTitle} on ${data.bookingDate}. Check your dashboard. - Bookhushly`,

  bookingStatusUpdate: (data) =>
    `📱 Booking Update: Your booking for ${data.serviceTitle} is now ${data.status}. Ref: ${data.bookingId}. - Bookhushly`,
};

// ✅ Send SMS
export const sendSMS = async (to, templateName, data) => {
  try {
    const twilioClient = getTwilioClient();

    const template = smsTemplates[templateName];
    if (!template) throw new Error(`SMS template '${templateName}' not found`);

    const formattedPhone = to.startsWith("+")
      ? to
      : `+234${to.replace(/^0/, "")}`;

    const message = await twilioClient.messages.create({
      body: template(data),
      from: TWILIO_PHONE_NUMBER,
      to: formattedPhone,
    });

    console.log(`✅ SMS sent to ${formattedPhone}, SID: ${message.sid}`);
    return { success: true, messageId: message.sid };
  } catch (error) {
    console.error("❌ SMS send error:", error.message);
    return { success: false, error: error.message };
  }
};

// ✅ Send Bulk SMS
export const sendBulkSMS = async (recipients, templateName, data) => {
  try {
    const twilioClient = getTwilioClient();

    const template = smsTemplates[templateName];
    if (!template) throw new Error(`SMS template '${templateName}' not found`);

    const results = [];
    for (const recipient of recipients) {
      try {
        const formattedPhone = recipient.phone.startsWith("+")
          ? recipient.phone
          : `+234${recipient.phone.replace(/^0/, "")}`;

        const message = await twilioClient.messages.create({
          body: template({ ...data, ...recipient }),
          from: TWILIO_PHONE_NUMBER,
          to: formattedPhone,
        });

        results.push({
          phone: formattedPhone,
          success: true,
          messageId: message.sid,
        });
      } catch (error) {
        results.push({
          phone: recipient.phone,
          success: false,
          error: error.message,
        });
      }
    }

    const successCount = results.filter((r) => r.success).length;
    console.log(`📢 Bulk SMS: ${successCount}/${recipients.length} sent.`);

    return {
      success: true,
      results,
      successCount,
      totalCount: recipients.length,
    };
  } catch (error) {
    console.error("❌ Bulk SMS error:", error.message);
    return { success: false, error: error.message };
  }
};

// ✅ Utility SMS functions
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOTPSMS = async (phone, otp) => {
  return await sendSMS(phone, "otpVerification", { otp });
};

export const sendBookingConfirmationSMS = async (phone, bookingData) => {
  return await sendSMS(phone, "bookingConfirmation", bookingData);
};

export const sendBookingReminderSMS = async (phone, bookingData) => {
  return await sendSMS(phone, "bookingReminder", bookingData);
};

export const sendPaymentConfirmationSMS = async (phone, paymentData) => {
  return await sendSMS(phone, "paymentConfirmation", paymentData);
};

export const sendKycApprovalSMS = async (phone, vendorData) => {
  return await sendSMS(phone, "kycApproval", vendorData);
};

export const sendKycRejectionSMS = async (phone, vendorData) => {
  return await sendSMS(phone, "kycRejection", vendorData);
};

export const sendNewBookingVendorSMS = async (phone, bookingData) => {
  return await sendSMS(phone, "newBookingVendor", bookingData);
};

export const sendBookingStatusUpdateSMS = async (phone, bookingData) => {
  return await sendSMS(phone, "bookingStatusUpdate", bookingData);
};

export const sendPasswordResetSMS = async (phone, resetCode) => {
  return await sendSMS(phone, "passwordReset", { resetCode });
};
