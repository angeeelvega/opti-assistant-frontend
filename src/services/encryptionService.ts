export const encryptionService = {
  encrypt: (data: any): string => {
    try {
      const jsonString = JSON.stringify(data);
      return btoa(encodeURIComponent(jsonString)); 
    } catch (error) {
      console.error('Error encrypting data:', error);
      throw error;
    }
  },

  decrypt: (encryptedData: string): any => {
    try {
      const jsonString = decodeURIComponent(atob(encryptedData)); 
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Error decrypting data:', error);
      throw error;
    }
  }
};
