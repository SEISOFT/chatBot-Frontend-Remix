import { useState, useEffect } from "react";

export const useQRCode = () => {
  const [qrCode, setQRCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchQRCode = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://chatbot-backend-1-nuoq.onrender.com/api-whatsapp/qr");
      if (!response.ok) {
        throw new Error("Failed to fetch QR code");
      }
      const data = await response.json();
      setQRCode(data.qr);
    } catch (error) {
      console.error("Error fetching QR code:", error);
      setError("Failed to fetch QR code");
      setQRCode(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQRCode();
  }, []);

  return { qrCode, error, isLoading, refetch: fetchQRCode };
};
