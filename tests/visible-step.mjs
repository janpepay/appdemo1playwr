// Copia este módulo a la suite y pásale test de @playwright/test y la página actual.
export function visibleStep(test, page, title, action) {
  return test.step(title, async step => {
    let result;
    try {
      result = await action();
    } catch (error) {
      try {
        const path = test.info().outputPath('step-' + crypto.randomUUID() + '.png');
        await page.screenshot({ path, timeout: 2000 });
        await step.attach('testhub-failure', { path, contentType: 'image/png' });
      } catch {
        // Conserva la causa original si el navegador ya se cerró.
      }
      throw error;
    }
    try {
      const image = await page.screenshot({ type: 'jpeg', quality: 60, timeout: 2000 });
      if (process.env.CI) process.stdout.write(JSON.stringify({ testhub: true, kind: 'frame', title, image: image.toString('base64') }) + '\n');
    } catch {
      // La captura en directo no debe cambiar el resultado del paso.
    }
    return result;
  });
}
