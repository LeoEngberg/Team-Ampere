import { describe, it, expect, vi } from 'vitest'
import { fetchInvoices, submitMove } from './api'

describe('fetchInvoices', () => {
  it('returns invoices from API', async () => {
    const invoices = [
      {
        id: 'F-2026-01',
        status: 'Betald',
      },
    ]

    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(invoices),
        })
      )
    )

    const result = await fetchInvoices()

    expect(result).toEqual(invoices)
  })
})

describe('submitMove', () => {
  it('returns the response from API', async () => {
    const response = {
      reference: 'REF-123',
    }

    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(response),
        })
      )
    )

    const data = {
      address: 'Solvägen 12',
      zip: '80267',
      city: 'Gävle',
      date: '2026-10-01',
      contract: 'Rörligt pris',
    }

    const result = await submitMove(data)

    expect(result).toEqual(response)
  })

  it('calls the move API with POST and the correct data', async () => {
    const data = {
      address: 'Solvägen 12',
      zip: '80267',
      city: 'Gävle',
      date: '2026-10-01',
      contract: 'Rörligt pris',
    }

    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ reference: 'ABC123' }),
        })
      )
    )

    await submitMove(data)

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:4000/api/move',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(data),
      })
    )
  })
})
