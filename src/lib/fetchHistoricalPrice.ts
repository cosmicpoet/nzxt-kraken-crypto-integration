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

export const fetchHistoricalPrice = async (interval: string) => {
  let bar: string, limit: number

  if (interval === '24h') {
    bar = '15m'
    limit = 96
  } else {
    bar = '2H'
    limit = 84
  }

  const response = await axios.get(
    `https://www.okx.com/api/v5/market/index-candles?instId=SOL-USD&bar=${bar}&limit=${limit}`,
  )

  const responseData = response.data as OKXCandleSticksResponse
  const processedData = responseData.data
    .map((datum) => ({ timestamp: new Date(Number(datum.at(0))), close: Number(datum.at(4)) }))
    .toReversed()

  return processedData
}
