export async function startUILazy() {
  try {
    const {startUI} = await import('./startUI');
    startUI();
  } catch (error) {
    console.error('Error rendering widget:', error);
  }
}
