import { useState, useCallback } from 'react';
import { createWorker } from 'tesseract.js';

export const useOCR = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processImage = useCallback(async (imageFile: File): Promise<string> => {
    setIsProcessing(true);
    setError(null);

    try {
      const worker = await createWorker();
      
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      
      const { data: { text } } = await worker.recognize(imageFile);
      
      await worker.terminate();
      
      return text.trim();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to process image';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return { processImage, isProcessing, error };
};