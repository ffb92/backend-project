import { getAccessToken, getToken } from './auth.js';

// Middleware zum Überprüfen und Aktualisieren des Access Tokens
//! Wenn Token nicht gültig ist neuen abrufen oder Error.
const checkAccessToken = async (req, res, next) => {
  if (!getToken()) {
    try {
      await getAccessToken();
    } catch (error) {
      console.error('Error, fehler beim fetchen des Access Token:', error);
      return res.status(500).send('Error, fehler beim fetchen des Access Token');
    }
  }
  next();
};

export default checkAccessToken;