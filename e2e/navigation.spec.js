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
  await page.route('**/api/invoices', (route) => route.fulfill({ json: [] }))
})

test('navigation between different pages work', async ({ page }) => {
  await page.goto('/login')
  await page.getByRole('button', { name: 'Logga in' }).click()

  //Översikt(Dashboard)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Hej Test!')

  //Fakturor(Invoices)
  await page.getByRole('link', { name: 'Fakturor' }).click()
  await expect(page).toHaveURL(/\/fakturor/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Fakturor')

  //Flyttanmälan(MoveForm)
  await page.getByRole('link', { name: 'Flyttanmälan' }).click()
  await expect(page).toHaveURL(/\/flytt/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Flyttanmälan')

  //Mina uppgifter(Profile)
  await page.getByRole('link', { name: 'Mina uppgifter' }).click()
  await expect(page).toHaveURL(/\/profil/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Mina uppgifter')

  //Tillbaks till Översikt(Dashboard)
  await page.getByRole('link', { name: 'Översikt' }).click()
  await expect(page).toHaveURL(/\//)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Hej Test!')
})
