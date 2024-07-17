import https from 'https';
import { getToken } from '../middleware/auth.js';

// Funktion, um Daten von der IGDB-API abzurufen
export const fetchFromIGDB = (endpoint, query) => {
  return new Promise((resolve, reject) => {
    const postData = query;
    //! Daten für die POST-Anfrage
    const options = {
      hostname: 'api.igdb.com',
      path: `/v4/${endpoint}`,
      method: 'POST',
      headers: {
        'Client-ID': process.env.CLIENT_ID,
        Authorization: `Bearer ${getToken()}`,
        Accept: 'application/json',
        'Content-Type': 'text/plain',
        'Content-Length': postData.length,
      },
    };


    //! Optionen für die HTTPS-Anfrage
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error('Failed to fetch data from IGDB'));
        }
      });
    });

    // Fehlerbehandlung
    req.on('error', (e) => {
      reject(e);
    });

    // Senden der Anfrage
    req.write(postData);
    req.end();
  });
};