// Main entry point that detects the environment and exports the appropriate plugin

/**
 * Factory function that creates the plugin for either webpack or vite
 * @param {Object} options - Plugin configuration options
 * @returns {Object} - The appropriate plugin instance
 */
export default function createBundlerPlugin(options = {}) {
  const defaultOptions = {
    quality: 80,
    extensions: ["jpg", "jpeg", "png", "webp"],
    exclude: [],
    include: [],
    ...options,
  }

  // Detect if we're in a webpack or vite environment
  if (typeof process !== "undefined" && process.env.VITE) {
    return createVitePlugin(defaultOptions)
  } else {
    return createWebpackPlugin(defaultOptions)
  }
}

/**
 * Creates a webpack plugin instance
 * @param {Object} options - Plugin configuration
 * @returns {Object} - Webpack plugin instance
 */
function createWebpackPlugin(options) {
  return new WebpackImageOptimizer(options)
}

/**
 * Creates a vite plugin instance
 * @param {Object} options - Plugin configuration
 * @returns {Object} - Vite plugin instance
 */
function createVitePlugin(options) {
  return {
    name: "vite-image-optimizer",
    enforce: "pre",
    async transform(code, id) {
      if (!shouldProcessFile(id, options)) return null

      // Process the image file
      const optimizedImage = await optimizeImage(id, options)

      // Return the optimized image as base64 or file reference depending on size
      return `export default ${JSON.stringify(optimizedImage)}`
    },
  }
}

/**
 * Webpack plugin implementation
 */
class WebpackImageOptimizer {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    const pluginName = "WebpackImageOptimizer"

    compiler.hooks.emit.tapAsync(pluginName, async (compilation, callback) => {
      // Get all asset filenames
      const assetNames = Object.keys(compilation.assets)

      // Process each asset that matches our criteria
      for (const assetName of assetNames) {
        if (!shouldProcessFile(assetName, this.options)) continue

        try {
          const asset = compilation.assets[assetName]
          const source = asset.source()

          // Optimize the image
          const optimizedImage = await optimizeBuffer(source, this.options)

          // Replace the asset with the optimized version
          compilation.assets[assetName] = {
            source: () => optimizedImage,
            size: () => optimizedImage.length,
          }
        } catch (error) {
          console.error(`Error optimizing ${assetName}:`, error)
        }
      }

      callback()
    })
  }
}

/**
 * Determines if a file should be processed based on options
 * @param {string} filename - The file path or name
 * @param {Object} options - Plugin options
 * @returns {boolean} - Whether the file should be processed
 */
function shouldProcessFile(filename, options) {
  const { extensions, include, exclude } = options

  // Check file extension
  const ext = filename.split(".").pop().toLowerCase()
  if (!extensions.includes(ext)) return false

  // Check include/exclude patterns
  if (include.length > 0 && !include.some((pattern) => new RegExp(pattern).test(filename))) {
    return false
  }

  if (exclude.length > 0 && exclude.some((pattern) => new RegExp(pattern).test(filename))) {
    return false
  }

  return true
}

/**
 * Optimizes an image from a file path
 * @param {string} filePath - Path to the image file
 * @param {Object} options - Optimization options
 * @returns {Promise<string>} - Optimized image data
 */
async function optimizeImage(filePath, options) {
  // In a real implementation, this would use sharp or another image processing library
  // For this example, we'll just simulate the optimization
  console.log(`Optimizing image: ${filePath}`)

  // This would be replaced with actual image optimization code
  return `optimized-${filePath}`
}

/**
 * Optimizes an image from a buffer
 * @param {Buffer} buffer - Image data buffer
 * @param {Object} options - Optimization options
 * @returns {Promise<Buffer>} - Optimized image buffer
 */
async function optimizeBuffer(buffer, options) {
  // In a real implementation, this would use sharp or another image processing library
  // For this example, we'll just return the original buffer
  console.log(`Optimizing image buffer with quality: ${options.quality}`)

  // This would be replaced with actual image optimization code
  return buffer
}

