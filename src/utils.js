/**
 * Utility functions for the image optimizer plugin
 */

/**
 * Formats a file size in bytes to a human-readable string
 * @param {number} bytes - File size in bytes
 * @param {number} decimals - Number of decimal places
 * @returns {string} - Formatted file size
 */
export function formatFileSize(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
}

/**
 * Logs optimization results
 * @param {string} filename - Name of the file
 * @param {number} originalSize - Original file size in bytes
 * @param {number} optimizedSize - Optimized file size in bytes
 */
export function logOptimizationResult(filename, originalSize, optimizedSize) {
  const savings = originalSize - optimizedSize
  const percentage = ((savings / originalSize) * 100).toFixed(2)

  console.log(
    `Optimized ${filename}: ${formatFileSize(originalSize)} → ${formatFileSize(optimizedSize)} ` +
      `(saved ${formatFileSize(savings)}, ${percentage}%)`,
  )
}

/**
 * Validates plugin options and sets defaults
 * @param {Object} options - User provided options
 * @returns {Object} - Validated options with defaults
 */
export function validateOptions(options = {}) {
  const defaults = {
    quality: 80,
    extensions: ["jpg", "jpeg", "png", "webp"],
    exclude: [],
    include: [],
  }

  const result = { ...defaults, ...options }

  // Validate quality
  if (typeof result.quality !== "number" || result.quality < 0 || result.quality > 100) {
    console.warn(`Invalid quality value: ${result.quality}. Using default: 80`)
    result.quality = 80
  }

  // Validate extensions
  if (!Array.isArray(result.extensions)) {
    console.warn(`Invalid extensions value. Using defaults.`)
    result.extensions = defaults.extensions
  }

  return result
}

