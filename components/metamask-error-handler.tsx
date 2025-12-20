"use client"

import { useEffect } from "react"

/**
 * Suppresses MetaMask connection errors that occur when the extension
 * tries to inject into pages that don't use it.
 * This handler only suppresses errors from MetaMask's extension scripts.
 */
export function MetaMaskErrorHandler() {
  useEffect(() => {
    const isMetaMaskError = (message: string, stack?: string): boolean => {
      const hasMetaMaskMessage = 
        message.includes("Failed to connect to MetaMask") ||
        message.includes("MetaMask connection")
      
      const hasMetaMaskStack = 
        stack?.includes("chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn") ||
        stack?.includes("inpage.js") ||
        false

      return hasMetaMaskMessage && hasMetaMaskStack
    }

    // Intercept console.error to filter MetaMask errors
    const originalError = console.error
    console.error = (...args: unknown[]) => {
      const message = String(args[0] || "")
      const errorObj = args.find((arg) => arg instanceof Error) as Error | undefined
      const stack = errorObj?.stack || (args[1] ? String(args[1]) : undefined)

      // Only filter if it's clearly a MetaMask connection error from the extension
      if (isMetaMaskError(message, stack)) {
        // Silently ignore MetaMask connection errors
        return
      }

      // Pass through all other errors
      originalError.apply(console, args)
    }

    // Handle unhandled promise rejections from MetaMask
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const errorMessage = String(event.reason || "")
      if (
        errorMessage.includes("Failed to connect to MetaMask") &&
        (errorMessage.includes("chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn") ||
         errorMessage.includes("inpage.js"))
      ) {
        event.preventDefault()
      }
    }

    // Handle errors from MetaMask extension scripts
    const handleError = (event: ErrorEvent) => {
      const errorSource = event.filename || ""
      if (errorSource.includes("chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn")) {
        event.preventDefault()
      }
    }

    window.addEventListener("unhandledrejection", handleUnhandledRejection)
    window.addEventListener("error", handleError)

    // Cleanup
    return () => {
      window.removeEventListener("unhandledrejection", handleUnhandledRejection)
      window.removeEventListener("error", handleError)
      console.error = originalError
    }
  }, [])

  return null
}
