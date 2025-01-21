import { useState, useEffect, useCallback } from "react";
import { useError } from "./useError";

export const useQRCode = () => {
  const { reportError } = useError();
  const [qrCode, setQRCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchQRCode = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://chatbot-backend-1-nuoq.onrender.com/api-whatsapp/qr"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch QR code");
      }
      const data = await response.json();
      setQRCode(data.qr);
    } catch (error) {
      reportError({
        component: "useQRCode.tsx Ln.22",
        title: "Error fetching QR code",
        message: `${error}`,
        showInProd: true,
      });
      setQRCode(null);
    } finally {
      setIsLoading(false);
    }
  }, [reportError]);

  useEffect(() => {
    fetchQRCode();
  }, [fetchQRCode]);

  return { qrCode, isLoading, refetch: fetchQRCode };
};
