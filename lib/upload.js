// File upload service with Cloudinary
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
}

// Upload image to Cloudinary
export const uploadImage = async (file, folder = 'bookhushly') => {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      throw new Error('Cloudinary not configured')
    }

    const result = await cloudinary.uploader.upload(file, {
      folder: folder,
      resource_type: 'image',
      transformation: [
        { width: 1200, height: 800, crop: 'limit', quality: 'auto' },
        { fetch_format: 'auto' }
      ]
    })

    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes
    }
  } catch (error) {
    console.error('Image upload error:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Upload multiple images
export const uploadMultipleImages = async (files, folder = 'bookhushly') => {
  try {
    const uploadPromises = files.map(file => uploadImage(file, folder))
    const results = await Promise.all(uploadPromises)
    
    const successful = results.filter(result => result.success)
    const failed = results.filter(result => !result.success)
    
    return {
      success: failed.length === 0,
      successful,
      failed,
      totalUploaded: successful.length,
      totalFailed: failed.length
    }
  } catch (error) {
    console.error('Multiple image upload error:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Upload document (PDF, DOC, etc.)
export const uploadDocument = async (file, folder = 'bookhushly/documents') => {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      throw new Error('Cloudinary not configured')
    }

    const result = await cloudinary.uploader.upload(file, {
      folder: folder,
      resource_type: 'raw', // For non-image files
      allowed_formats: ['pdf', 'doc', 'docx', 'txt', 'jpg', 'jpeg', 'png']
    })

    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      bytes: result.bytes,
      originalFilename: result.original_filename
    }
  } catch (error) {
    console.error('Document upload error:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Delete file from Cloudinary
export const deleteFile = async (publicId) => {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      throw new Error('Cloudinary not configured')
    }

    const result = await cloudinary.uploader.destroy(publicId)
    
    return {
      success: result.result === 'ok',
      result: result.result
    }
  } catch (error) {
    console.error('File delete error:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Generate upload signature for client-side uploads
export const generateUploadSignature = (folder = 'bookhushly') => {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      throw new Error('Cloudinary not configured')
    }

    const timestamp = Math.round(new Date().getTime() / 1000)
    const params = {
      timestamp,
      folder,
      transformation: 'w_1200,h_800,c_limit,q_auto,f_auto'
    }

    const signature = cloudinary.utils.api_sign_request(params, process.env.CLOUDINARY_API_SECRET)

    return {
      success: true,
      signature,
      timestamp,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      folder
    }
  } catch (error) {
    console.error('Upload signature generation error:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Optimize image URL
export const optimizeImageUrl = (url, options = {}) => {
  try {
    if (!url || !url.includes('cloudinary.com')) {
      return url
    }

    const {
      width = 800,
      height = 600,
      crop = 'fill',
      quality = 'auto',
      format = 'auto'
    } = options

    // Extract public ID from Cloudinary URL
    const urlParts = url.split('/')
    const uploadIndex = urlParts.findIndex(part => part === 'upload')
    
    if (uploadIndex === -1) return url

    // Insert transformation parameters
    const transformations = `w_${width},h_${height},c_${crop},q_${quality},f_${format}`
    urlParts.splice(uploadIndex + 1, 0, transformations)

    return urlParts.join('/')
  } catch (error) {
    console.error('Image optimization error:', error)
    return url
  }
}

// Get file info from Cloudinary
export const getFileInfo = async (publicId) => {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      throw new Error('Cloudinary not configured')
    }

    const result = await cloudinary.api.resource(publicId)
    
    return {
      success: true,
      info: {
        publicId: result.public_id,
        url: result.secure_url,
        format: result.format,
        width: result.width,
        height: result.height,
        bytes: result.bytes,
        createdAt: result.created_at,
        resourceType: result.resource_type
      }
    }
  } catch (error) {
    console.error('Get file info error:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Validate file type and size
export const validateFile = (file, options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    allowedExtensions = ['jpg', 'jpeg', 'png', 'webp']
  } = options

  const errors = []

  // Check file size
  if (file.size > maxSize) {
    errors.push(`File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`)
  }

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    errors.push(`File type must be one of: ${allowedTypes.join(', ')}`)
  }

  // Check file extension
  const extension = file.name.split('.').pop()?.toLowerCase()
  if (!allowedExtensions.includes(extension)) {
    errors.push(`File extension must be one of: ${allowedExtensions.join(', ')}`)
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Convert file to base64 for upload
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}