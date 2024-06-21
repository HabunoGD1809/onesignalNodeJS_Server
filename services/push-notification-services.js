const https = require('https');
const { ONE_SIGNAL_CONFIG } = require('../config/app.config');

const oneSignalAppId = ONE_SIGNAL_CONFIG.appId;
const oneSignalApiKey = ONE_SIGNAL_CONFIG.apiKey;

async function SendNotification(data) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'onesignal.com',
      port: 443,
      path: '/api/v1/notifications',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Basic ${oneSignalApiKey}`,
      },
    };

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const parsedData = JSON.parse(responseData);
          console.log('Response:', parsedData);
          resolve(parsedData);
        } catch (error) {
          console.error('Error parsing response:', error);
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      console.error('Error:', error);
      reject(error);
    });

    req.write(JSON.stringify(data));
    req.end();
  });
}

module.exports = { SendNotification };
