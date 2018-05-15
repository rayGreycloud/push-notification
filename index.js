const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize server
const app = express();

// Middleware
app.use(bodyParser.JSON());

// Generate vapid keys
const vapidKeys = webpush.generateVAPIDKeys();
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
