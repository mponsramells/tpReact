import { test, expect } from '@playwright/test';

//les tests de la calculatrice ne passe pas pour le button 3, 5 qui retourne pas la bonne valeur
//et pour les addition et soustraction qui n'effectue pas la bonne action
test.describe('Calculatrice Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });
  const data = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  for (let i = 0; i < data.length; i++) {
    test(`Test button ${data[i]}`, async ({ page }) => {
      await page.getByRole('button', { name: data[i] }).click();
      await expect(page.locator('.screen')).toContainText(data[i]);
    });
  }
  test('Test basic sum', async ({ page }) => {
    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: 'sum' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.locator('.screen')).toContainText('3');
  });
  test('Test reset value', async ({ page }) => {
    await page.getByRole('button', { name: 'C', exact: true }).click();
    await expect(page.locator('.screen')).toContainText('0');
  });
  test('Test basic substraction', async ({ page }) => {
    await page.getByRole('button', { name: 'C', exact: true }).click();
    await page.getByRole('button', { name: '6' }).click();
    await page.getByRole('button', { name: 'soustraction' }).click();
    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.locator('.screen')).toContainText('5');
  });
  test('Test basic multiplication', async ({ page }) => {
    await page.getByRole('button', { name: 'C', exact: true }).click();
    await page.getByRole('button', { name: '6' }).click();
    await page.getByRole('button', { name: 'multiplication' }).click();
    await page.getByRole('button', { name: '0' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.locator('.screen')).toContainText('0');
  });
  test('Check equal button color', async ({ page }) => {
    const equalButton = await page.getByRole('button', { name: '=' });
    await expect(equalButton).toHaveCSS('background-color', 'rgb(255, 0, 0)');
  });

});
