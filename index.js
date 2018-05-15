const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize server
const app = express();

// Set static path
app.use(express.static(path.join(__dirname, 'client')));

// Middleware
app.use(bodyParser.json());

// Generate vapid keys
// const vapidKeys = webpush.generateVAPIDKeys();
// Set vapid keys
vapidKeys.publicKey =
  'BPY2BrEkScRg2oPpgjVi0-mQxt0HH8JIfGFL9orqeBKcBSbcSK6ZSVF_WYnxsK8Ah2_g8_r5T4CN_0OwY_-ygiU';
vapidKeys.privateKey = '2_sP3B6tTNtBHG09nuvdo8Mj1uFgzHz3jv5BvOWhNwA';

// Set details
webpush.setVapidDetails(
  'mailto:raygreycloud@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// Subscribe route
app.post('/subscribe', (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send status 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({
    title: 'Push Test'
  });

  // Pass object into sendNotification func
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(error));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
