// Enhanced Payment integration with Paystack and Flutterwave
import { supabase } from './supabase'

// Paystack configuration
const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY

// Flutterwave configuration
const FLUTTERWAVE_PUBLIC_KEY = process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY
const FLUTTERWAVE_SECRET_KEY = process.env.FLUTTERWAVE_SECRET_KEY

// Initialize payment with selected provider
export const initializePayment = async (provider, paymentData) => {
  try {
    if (provider === 'paystack') {
      return await initializePaystackPayment(paymentData)
    } else if (provider === 'flutterwave') {
      return await initializeFlutterwavePayment(paymentData)
    } else {
      throw new Error('Unsupported payment provider')
    }
  } catch (error) {
    console.error('Payment initialization error:', error)
    return { data: null, error }
  }
}

// Paystack payment initialization
const initializePaystackPayment = async (paymentData) => {
  try {
    if (!PAYSTACK_SECRET_KEY) {
      throw new Error('Paystack secret key not configured')
    }

    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: paymentData.email,
        amount: paymentData.amount,
        currency: paymentData.currency || 'NGN',
        reference: paymentData.reference,
        callback_url: paymentData.callback_url,
        metadata: paymentData.metadata,
        channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer']
      })
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || 'Payment initialization failed')
    }

    // Store payment record in database
    await createPaymentRecord({
      reference: paymentData.reference,
      booking_id: paymentData.metadata.booking_id,
      customer_id: paymentData.metadata.customer_id,
      amount: paymentData.amount / 100, // Convert back to naira
      provider: 'paystack',
      status: 'pending',
      payment_data: data.data
    })

    return { data: data.data, error: null }
  } catch (error) {
    console.error('Paystack initialization error:', error)
    return { data: null, error }
  }
}

// Flutterwave payment initialization
const initializeFlutterwavePayment = async (paymentData) => {
  try {
    if (!FLUTTERWAVE_SECRET_KEY) {
      throw new Error('Flutterwave secret key not configured')
    }

    const response = await fetch('https://api.flutterwave.com/v3/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tx_ref: paymentData.reference,
        amount: paymentData.amount / 100, // Flutterwave expects amount in main currency unit
        currency: paymentData.currency || 'NGN',
        redirect_url: paymentData.callback_url,
        customer: {
          email: paymentData.email,
          name: paymentData.metadata.customer_name || 'Customer'
        },
        customizations: {
          title: 'Bookhushly Payment',
          description: `Payment for ${paymentData.metadata.service_title}`,
          logo: 'https://your-logo-url.com/logo.png'
        },
        meta: paymentData.metadata
      })
    })

    const data = await response.json()
    
    if (!response.ok || data.status !== 'success') {
      throw new Error(data.message || 'Payment initialization failed')
    }

    // Store payment record in database
    await createPaymentRecord({
      reference: paymentData.reference,
      booking_id: paymentData.metadata.booking_id,
      customer_id: paymentData.metadata.customer_id,
      amount: paymentData.amount / 100,
      provider: 'flutterwave',
      status: 'pending',
      payment_data: data.data
    })

    return { data: { authorization_url: data.data.link }, error: null }
  } catch (error) {
    console.error('Flutterwave initialization error:', error)
    return { data: null, error }
  }
}

// Verify payment status
export const verifyPayment = async (reference) => {
  try {
    // Get payment record from database
    const { data: paymentRecord, error: dbError } = await getPaymentRecord(reference)
    
    if (dbError || !paymentRecord) {
      throw new Error('Payment record not found')
    }

    let verificationResult
    if (paymentRecord.provider === 'paystack') {
      verificationResult = await verifyPaystackPayment(reference)
    } else if (paymentRecord.provider === 'flutterwave') {
      verificationResult = await verifyFlutterwavePayment(reference)
    } else {
      throw new Error('Unsupported payment provider')
    }

    // Update payment status in database
    if (verificationResult.data && verificationResult.data.status === 'success') {
      await updatePaymentRecord(reference, {
        status: 'completed',
        verified_at: new Date().toISOString(),
        verification_data: verificationResult.data
      })
    }

    return verificationResult
  } catch (error) {
    console.error('Payment verification error:', error)
    return { data: null, error }
  }
}

// Verify Paystack payment
const verifyPaystackPayment = async (reference) => {
  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
      }
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || 'Payment verification failed')
    }

    return { 
      data: { 
        status: data.data.status === 'success' ? 'success' : 'failed',
        amount: data.data.amount / 100,
        reference: data.data.reference,
        gateway_response: data.data.gateway_response
      }, 
      error: null 
    }
  } catch (error) {
    return { data: null, error }
  }
}

// Verify Flutterwave payment
const verifyFlutterwavePayment = async (reference) => {
  try {
    const response = await fetch(`https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${reference}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
      }
    })

    const data = await response.json()
    
    if (!response.ok || data.status !== 'success') {
      throw new Error(data.message || 'Payment verification failed')
    }

    return { 
      data: { 
        status: data.data.status === 'successful' ? 'success' : 'failed',
        amount: data.data.amount,
        reference: data.data.tx_ref,
        gateway_response: data.data.processor_response
      }, 
      error: null 
    }
  } catch (error) {
    return { data: null, error }
  }
}

// Database operations for payments
const createPaymentRecord = async (paymentData) => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .insert({
        ...paymentData,
        created_at: new Date().toISOString()
      })
      .select()
      .single()
    
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Create payment record error:', error)
    return { data: null, error }
  }
}

const getPaymentRecord = async (reference) => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('reference', reference)
      .single()
    
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

const updatePaymentRecord = async (reference, updates) => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('reference', reference)
      .select()
      .single()
    
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

// Webhook handlers for payment providers
export const handlePaystackWebhook = async (event) => {
  try {
    if (event.event === 'charge.success') {
      const reference = event.data.reference
      await verifyPayment(reference)
    }
    return { success: true }
  } catch (error) {
    console.error('Paystack webhook error:', error)
    return { success: false, error }
  }
}

export const handleFlutterwaveWebhook = async (event) => {
  try {
    if (event.event === 'charge.completed') {
      const reference = event.data.tx_ref
      await verifyPayment(reference)
    }
    return { success: true }
  } catch (error) {
    console.error('Flutterwave webhook error:', error)
    return { success: false, error }
  }
}

// Refund functionality
export const processRefund = async (reference, amount = null) => {
  try {
    const { data: paymentRecord, error } = await getPaymentRecord(reference)
    
    if (error || !paymentRecord) {
      throw new Error('Payment record not found')
    }

    const refundAmount = amount || paymentRecord.amount

    let refundResult
    if (paymentRecord.provider === 'paystack') {
      refundResult = await processPaystackRefund(reference, refundAmount * 100)
    } else if (paymentRecord.provider === 'flutterwave') {
      refundResult = await processFlutterwaveRefund(reference, refundAmount)
    } else {
      throw new Error('Unsupported payment provider for refunds')
    }

    if (refundResult.data) {
      // Update payment record with refund information
      await updatePaymentRecord(reference, {
        status: 'refunded',
        refund_amount: refundAmount,
        refunded_at: new Date().toISOString(),
        refund_data: refundResult.data
      })
    }

    return refundResult
  } catch (error) {
    return { data: null, error }
  }
}

const processPaystackRefund = async (reference, amount) => {
  try {
    const response = await fetch('https://api.paystack.co/refund', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        transaction: reference,
        amount: amount
      })
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || 'Refund failed')
    }

    return { data: data.data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

const processFlutterwaveRefund = async (reference, amount) => {
  try {
    // First get the transaction ID from Flutterwave
    const verifyResponse = await fetch(`https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${reference}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
      }
    })

    const verifyData = await verifyResponse.json()
    
    if (!verifyResponse.ok || !verifyData.data) {
      throw new Error('Transaction not found for refund')
    }

    const transactionId = verifyData.data.id

    const response = await fetch(`https://api.flutterwave.com/v3/transactions/${transactionId}/refund`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount
      })
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || 'Refund failed')
    }

    return { data: data.data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

// Client-side payment initialization
export const initializeClientPayment = (paymentData, provider = 'paystack') => {
  return new Promise((resolve, reject) => {
    if (provider === 'paystack') {
      if (typeof window !== 'undefined' && window.PaystackPop) {
        const handler = window.PaystackPop.setup({
          key: PAYSTACK_PUBLIC_KEY,
          email: paymentData.email,
          amount: paymentData.amount,
          currency: paymentData.currency || 'NGN',
          ref: paymentData.reference,
          metadata: paymentData.metadata,
          callback: function(response) {
            resolve(response)
          },
          onClose: function() {
            reject(new Error('Payment cancelled'))
          }
        })
        handler.openIframe()
      } else {
        reject(new Error('Paystack not loaded'))
      }
    } else if (provider === 'flutterwave') {
      if (typeof window !== 'undefined' && window.FlutterwaveCheckout) {
        window.FlutterwaveCheckout({
          public_key: FLUTTERWAVE_PUBLIC_KEY,
          tx_ref: paymentData.reference,
          amount: paymentData.amount / 100,
          currency: paymentData.currency || 'NGN',
          customer: {
            email: paymentData.email,
            name: paymentData.metadata.customer_name || 'Customer'
          },
          callback: function(response) {
            resolve(response)
          },
          onclose: function() {
            reject(new Error('Payment cancelled'))
          }
        })
      } else {
        reject(new Error('Flutterwave not loaded'))
      }
    }
  })
}