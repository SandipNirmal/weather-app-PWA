const applicationServerPublicKey = 'BJtB8u178yBhRsSEXuDXWrOteEgV5YZ78B-_l7YRDYrsgsfA4dFRuqsHsrCQHnSMFNHJtAVzos5bzPth' +
    'WGkDxnI';
let swRegistration = null

function urlB64ToUint8Array(base64String) {
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

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator
      .serviceWorker
      .register('./sw.js')
      .then(registration => {
        // Registration was successful
        swRegistration = registration
        console.log('ServiceWorker registration successful with scope: ', registration.scope)

        // register push
        // initializeUI()
      })
      .catch(err => {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}

// function initializeUI() {
//   // Set the initial subscription value
//   swRegistration
//     .pushManager
//     .getSubscription()
//     .then(function (subscription) {
//       isSubscribed = !(subscription === null);

//       if (isSubscribed) {
//         console.log('User IS subscribed.');
//       } else {
//         console.log('User is NOT subscribed.');
//         subscribeUser()
//       }

//       // updateBtn();
//     });
// }

// function updateBtn() {
//   if (isSubscribed) {
//     pushButton.textContent = 'Disable Push Messaging';
//   } else {
//     pushButton.textContent = 'Enable Push Messaging';
//   }

//   pushButton.disabled = false;
// }

// function subscribeUser() {
//   const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);

//   swRegistration.pushManager.subscribe({
//     userVisibleOnly: true,
//     applicationServerKey: applicationServerKey
//   })
//   .then(function(subscription) {
//     console.log('User is subscribed.');

//     updateSubscriptionOnServer(subscription);

//     isSubscribed = true;

//     // updateBtn();
//   })
//   .catch(function(err) {
//     console.log('Failed to subscribe the user: ', err);
//     updateBtn();
//   });
// }