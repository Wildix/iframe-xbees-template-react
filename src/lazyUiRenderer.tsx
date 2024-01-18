export async function lazyUiRenderer() {
  try {
    const {renderReact} = await import('./reactRender');
    renderReact();
  } catch (error) {
    console.error('Error rendering widget:', error);
  }
}
