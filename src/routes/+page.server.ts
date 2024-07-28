import { fetchCurrentPrice } from '$lib/fetchCurrentPrice'
import { fetchHistoricalPrice } from '$lib/fetchHistoricalPrice'

export async function load() {
  const historicalData = await fetchHistoricalPrice()
  const currentData = await fetchCurrentPrice()

  return { timeseries: historicalData, current: currentData }
}
