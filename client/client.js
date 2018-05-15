const publicVapidKey =
  'BPY2BrEkScRg2oPpgjVi0-mQxt0HH8JIfGFL9orqeBKcBSbcSK6ZSVF_WYnxsK8Ah2_g8_r5T4CN_0OwY_-ygiU';

// Check for service worker
if ('serviceworker' in navigator) {
  send().catch(err => console.error(err));
}

// Register and push
async function send() {
  // Register service worker
  console.log('Registering service worker...');
  const register = await navigator.serviceWorker.register('./worker.js', {
    scope: '/'
  });
  console.log('Service worker registered...');

  // Register push
  console.log('Registering push...');
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServicerKey: urlBase64ToUint8Array(publicVapidKey)
  });
  console.log('Push registered...');

  // Send push notification
  console.log('Sending push notification...');
  await fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json'
    }
  });
  console.log('Push notifcation sent...');
}

// Convert key
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
