import axios from 'axios'

export type OKXCandleSticksResponse = {
  code: number
  msg: string
  data: string[][]
}

export type TimeseriesEntry = {
  timestamp: Date
  close: number
}

export type Timeseries = TimeseriesEntry[]

export const fetchHistoricalPrice = async () => {
  const response = await axios.get(
    'https://www.okx.com/api/v5/market/index-candles?instId=SOL-USD&bar=15m&limit=96',
  )

  const responseData = response.data as OKXCandleSticksResponse
  const processedData = responseData.data
    .map((datum) => ({ timestamp: new Date(Number(datum.at(0))), close: Number(datum.at(4)) }))
    .toReversed()
  return processedData
}
