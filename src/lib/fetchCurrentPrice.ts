import axios from 'axios'

export type OKXIndexTickerResponse = {
  code: number
  msg: string
  data: OKXIndexTicker[]
}

export type OKXIndexTicker = {
  instId: string
  idxPx: string
  high24h: string
  sodUtc0: string
  open24h: string
  low24h: string
  sodUtc8: string
  ts: string
}

export const fetchCurrentPrice = async () => {
  const response = await axios.get('https://www.okx.com/api/v5/market/index-tickers?instId=SOL-USD')

  const responseData = response.data as OKXIndexTickerResponse
  return responseData.data.at(0)
}
