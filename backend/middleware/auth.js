import https from 'https';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

let accessToken = '';

// Funktion, um das Access Token zu erhalten
export const getAccessToken = () => {
  return new Promise((resolve, reject) => {
    //! Daten für die POST-Anfrage
    const postData = new URLSearchParams({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: 'client_credentials',
    }).toString();

    //! Optionen für die HTTPS-Anfrage
    const options = {
      hostname: 'id.twitch.tv',
      path: '/oauth2/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length,
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode === 200) {
          accessToken = JSON.parse(data).access_token;
          console.log('Access Token:', accessToken);
          resolve();
        } else {
          console.error('Error, fehler beim fetchen des Access Token, Status Code:', res.statusCode);
          console.error('Response:', data);
          reject(new Error('Error, fehler beim fetchen des Access Token'));
        }
      });
    });

    // Errorhandling
    req.on('error', (e) => {
      console.error('Request error:', e);
      reject(e);
    });

    // Senden der Anfrage
    req.write(postData);
    req.end();
  });
};

export const getToken = () => accessToken;