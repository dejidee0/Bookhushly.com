// SMS service integration with Twilio
import twilio from 'twilio'

// Initialize Twilio client
let twilioClient = null
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
}

const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER

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
    `📱 Booking Update: Your booking for ${data.serviceTitle} is now ${data.status}. Ref: ${data.bookingId}. - Bookhushly`
}

// Send SMS function
export const sendSMS = async (to, templateName, data) => {
  try {
    if (!twilioClient) {
      console.warn('Twilio not configured, SMS not sent')
      return { success: false, error: 'SMS service not configured' }
    }

    const template = smsTemplates[templateName]
    if (!template) {
      throw new Error(`SMS template '${templateName}' not found`)
    }

    // Format phone number (ensure it starts with +)
    const formattedPhone = to.startsWith('+') ? to : `+234${to.replace(/^0/, '')}`

    const message = await twilioClient.messages.create({
      body: template(data),
      from: TWILIO_PHONE_NUMBER,
      to: formattedPhone
    })

    console.log(`SMS sent successfully to ${formattedPhone}, SID: ${message.sid}`)
    return { success: true, messageId: message.sid }
  } catch (error) {
    console.error('SMS send error:', error)
    return { success: false, error: error.message }
  }
}

// Bulk SMS function
export const sendBulkSMS = async (recipients, templateName, data) => {
  try {
    if (!twilioClient) {
      console.warn('Twilio not configured, SMS not sent')
      return { success: false, error: 'SMS service not configured' }
    }

    const template = smsTemplates[templateName]
    if (!template) {
      throw new Error(`SMS template '${templateName}' not found`)
    }

    const results = []
    for (const recipient of recipients) {
      try {
        const formattedPhone = recipient.phone.startsWith('+') ? recipient.phone : `+234${recipient.phone.replace(/^0/, '')}`
        
        const message = await twilioClient.messages.create({
          body: template({ ...data, ...recipient }),
          from: TWILIO_PHONE_NUMBER,
          to: formattedPhone
        })

        results.push({ phone: formattedPhone, success: true, messageId: message.sid })
      } catch (error) {
        results.push({ phone: recipient.phone, success: false, error: error.message })
      }
    }

    const successCount = results.filter(r => r.success).length
    console.log(`Bulk SMS: ${successCount}/${recipients.length} messages sent successfully`)
    
    return { success: true, results, successCount, totalCount: recipients.length }
  } catch (error) {
    console.error('Bulk SMS send error:', error)
    return { success: false, error: error.message }
  }
}

// Generate OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Send OTP SMS
export const sendOTPSMS = async (phone, otp) => {
  return await sendSMS(phone, 'otpVerification', { otp })
}

// Send booking confirmation SMS
export const sendBookingConfirmationSMS = async (phone, bookingData) => {
  return await sendSMS(phone, 'bookingConfirmation', bookingData)
}

// Send booking reminder SMS
export const sendBookingReminderSMS = async (phone, bookingData) => {
  return await sendSMS(phone, 'bookingReminder', bookingData)
}

// Send payment confirmation SMS
export const sendPaymentConfirmationSMS = async (phone, paymentData) => {
  return await sendSMS(phone, 'paymentConfirmation', paymentData)
}

// Send KYC approval SMS
export const sendKycApprovalSMS = async (phone, vendorData) => {
  return await sendSMS(phone, 'kycApproval', vendorData)
}

// Send KYC rejection SMS
export const sendKycRejectionSMS = async (phone, vendorData) => {
  return await sendSMS(phone, 'kycRejection', vendorData)
}

// Send new booking notification to vendor
export const sendNewBookingVendorSMS = async (phone, bookingData) => {
  return await sendSMS(phone, 'newBookingVendor', bookingData)
}

// Send booking status update SMS
export const sendBookingStatusUpdateSMS = async (phone, bookingData) => {
  return await sendSMS(phone, 'bookingStatusUpdate', bookingData)
}

// Send password reset SMS
export const sendPasswordResetSMS = async (phone, resetCode) => {
  return await sendSMS(phone, 'passwordReset', { resetCode })
}