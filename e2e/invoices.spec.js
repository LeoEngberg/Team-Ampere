import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.route('**/api/login', (route) =>
    route.fulfill({ json: { token: 'test', name: 'Test Testsson' } })
  )
  await page.route('**/api/user', (route) =>
    route.fulfill({ json: { name: 'Test Testsson', contract: 'Rörligt pris' } })
  )
  await page.route('**/api/consumption', (route) =>
    route.fulfill({ json: { unit: 'kWh', months: ['Jan'], values: [100], pricePerKwh: 2 } })
  )
})

test('fakturasidan visar det API:et svarar – även en faktura servern aldrig haft', async ({
  page,
}) => {
  await page.route('**/api/invoices', (route) =>
    route.fulfill({
      json: [
        { id: 'F-999', period: 'December 2019', amount: 999, status: 'Obetald', due: '2020-01-01' },
      ],
    })
  )

  await page.goto('/login')
  await page.getByRole('button', { name: 'Logga in' }).click()
  await page.getByRole('link', { name: 'Fakturor' }).click()

  await expect(page.getByText('F-999')).toBeVisible()
  await expect(page.getByText('December 2019')).toBeVisible()
})
