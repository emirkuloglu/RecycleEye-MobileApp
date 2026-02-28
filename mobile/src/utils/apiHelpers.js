import { API_URL, DEFAULT_CONFIDENCE, REALTIME_CONFIDENCE } from '../constants';

/**
 * Base64 görüntüden nesne tespiti yap
 * @param {string} base64Image - Base64 kodlanmış görüntü
 * @param {boolean} isRealtime - Gerçek zamanlı tespit mi
 * @returns {Promise<Object>} - Tespit sonucu
 */
export const detectObjects = async (base64Image, isRealtime = false) => {
  try {
    const confidence = isRealtime ? REALTIME_CONFIDENCE : DEFAULT_CONFIDENCE;
    
    const response = await fetch(`${API_URL}/detect/base64`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: base64Image, confidence }),
    });

    if (!response.ok) {
      throw new Error('API yanıt vermedi');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Detection error:', error);
    throw error;
  }
};
