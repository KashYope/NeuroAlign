
const STORAGE_KEY = 'neuroalign_secure_data_v1';
const SECRET_KEY = 'neuroalign_internal_privacy_key_2025';

/**
 * Obfuscates a string using a simple XOR cipher with an internal key.
 * This is intended to prevent casual peeking in localStorage and provide a 
 * "privacy-first" layer for sensitive screening data.
 */
const xorCipher = (text: string): string => {
  const textChars = text.split('');
  const keyChars = SECRET_KEY.split('');
  const output = textChars.map((c, i) => {
    return String.fromCharCode(c.charCodeAt(0) ^ keyChars[i % keyChars.length].charCodeAt(0));
  });
  return output.join('');
};

export const saveProgress = (data: any): void => {
  try {
    const jsonString = JSON.stringify(data);
    const encrypted = btoa(xorCipher(jsonString));
    localStorage.setItem(STORAGE_KEY, encrypted);
  } catch (error) {
    console.error('Failed to persist progress securely:', error);
  }
};

export const loadProgress = (): any | null => {
  try {
    const blob = localStorage.getItem(STORAGE_KEY);
    if (!blob) return null;
    
    const decrypted = xorCipher(atob(blob));
    return JSON.parse(decrypted);
  } catch (error) {
    // If decryption fails (e.g. data corrupted or legacy format), clear it
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

export const clearProgress = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
