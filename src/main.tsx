import Client from '@wildix/xbees-connect';

Client.initialize(async () => {
    try {
        const { default: renderReact } = await import('./reactRender');
        renderReact();
    } catch (error) {
        console.error('Error rendering widget:', error);
    }
});

console.debug(APP_NAME, APP_VERSION);
