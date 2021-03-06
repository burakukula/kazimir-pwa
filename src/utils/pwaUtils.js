export const initServiceWorker = () => {
  if (navigator.serviceWorker) {
    const options = {
      scope: '/',
    };

    navigator.serviceWorker
      .register('/serviceWorker.js', options)
      .then(registration => {
        console.info('Service worker regitstration success', registration); // eslint-disable-line no-console
      })
      .catch(error => {
        console.error('Service worker regitstration error', error);
      });
  }
};
