// Basic test structure for the plugin
// In a real implementation, you would add more comprehensive tests

describe("Bundler Image Optimizer", () => {
  test("should export a function", () => {
    const createBundlerPlugin = require("../dist/index").default
    expect(typeof createBundlerPlugin).toBe("function")
  })

  test("should return an object with the correct structure for webpack", () => {
    // Mock the environment to simulate webpack
    process.env.VITE = ""

    const createBundlerPlugin = require("../dist/index").default
    const plugin = createBundlerPlugin()

    expect(plugin).toBeDefined()
    expect(typeof plugin.apply).toBe("function")
  })

  test("should return an object with the correct structure for vite", () => {
    // Mock the environment to simulate vite
    process.env.VITE = "true"

    const createBundlerPlugin = require("../dist/index").default
    const plugin = createBundlerPlugin()

    expect(plugin).toBeDefined()
    expect(plugin.name).toBe("vite-image-optimizer")
    expect(typeof plugin.transform).toBe("function")
  })

  // Add more tests for specific functionality
})

