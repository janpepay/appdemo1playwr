import { test, expect } from 'playwright/test';
import { visibleStep } from './visible-step.mjs';

const title = 'Probar TestHub remoto';

async function addTask(page, delay = 0) {
  await visibleStep(test, page, 'Abrir TodoMVC', async () => {
    await page.goto('./', { waitUntil: 'domcontentloaded' });
    await expect(page.getByPlaceholder('What needs to be done?')).toBeVisible();
  });
  if (delay) await page.waitForTimeout(delay);
  await visibleStep(test, page, 'Crear la tarea «Probar TestHub remoto»', async () => {
    const input = page.getByPlaceholder('What needs to be done?');
    await input.fill(title);
    await input.press('Enter');
    await expect(page.getByText(title, { exact: true })).toBeVisible();
  });
  if (delay) await page.waitForTimeout(delay);
}

test('Camino correcto: completar una tarea', async ({ page }) => {
  await addTask(page, process.env.CI ? 1500 : 0);
  await visibleStep(test, page, 'Completar la tarea y abrir el filtro Completed', async () => {
    await page.getByRole('listitem').filter({ hasText: title }).getByRole('checkbox').check();
    await page.getByRole('link', { name: 'Completed', exact: true }).click();
    await expect(page.getByText(title, { exact: true })).toBeVisible();
  });
});

test('Fallo intencionado: esperar una tarea inexistente', async ({ page }) => {
  await addTask(page, process.env.CI ? 1500 : 0);
  await visibleStep(test, page, 'Comprobar una tarea que no existe', async () => {
    await expect(page.getByText('Esta tarea nunca se creó', { exact: true })).toBeVisible({ timeout: 2000 });
  });
});
