"use client";

/**
 * -----------------------------------------------------------------------------
 * Toast Provider
 * -----------------------------------------------------------------------------
 * Global notification provider using Sonner.
 *
 * Responsibilities:
 * • Success notifications
 * • Error notifications
 * • Warning notifications
 * • Info notifications
 * • Promise loading states
 * -----------------------------------------------------------------------------
 */

import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      expand
      visibleToasts={5}
      duration={4000}
      toastOptions={{
        style: {
          borderRadius: "12px",
        },
      }}
    />
  );
}
