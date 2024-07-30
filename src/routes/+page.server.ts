import { fetchCurrentPrice } from '$lib/fetchCurrentPrice'
import { fetchHistoricalPrice } from '$lib/fetchHistoricalPrice'
import type { Actions } from './$types'

export async function load({ url }) {
  const interval = url.searchParams.get('interval') ?? '24h'

  const historicalData = await fetchHistoricalPrice(interval)
  const currentData = await fetchCurrentPrice()

  return { timeseries: historicalData, current: currentData }
}

export const actions: Actions = {
  setTheme: async ({ url, cookies }) => {
    const theme = url.searchParams.get('theme')
    if (theme) {
      cookies.set('colortheme', theme, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
      })
    }
  },
}
