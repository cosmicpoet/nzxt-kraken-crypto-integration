export type Cryptocurrency = {
  id: string
  name: string
  symbol: string
  decimal: number
}

export const COIN_LIST: Cryptocurrency[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    decimal: 0,
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    decimal: 1,
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    decimal: 2,
  },
  {
    id: 'dogecoin',
    name: 'Dogecoin',
    symbol: 'DOGE',
    decimal: 4,
  },
  {
    id: 'toncoin',
    name: 'Toncoin',
    symbol: 'TON',
    decimal: 2,
  },
  {
    id: 'avalanche',
    name: 'Avalance',
    symbol: 'AVAX',
    decimal: 2,
  },
  {
    id: 'shiba-inu',
    name: 'Shiba Inu',
    symbol: 'SHIB',
    decimal: 8,
  },
  {
    id: 'polkadot',
    name: 'Polkadot',
    symbol: 'DOT',
    decimal: 2,
  },
  {
    id: 'near',
    name: 'Near',
    symbol: 'NEAR',
    decimal: 2,
  },
  {
    id: 'polygon',
    name: 'Polygon',
    symbol: 'MATIC',
    decimal: 4,
  },
  {
    id: 'aptos',
    name: 'Aptos',
    symbol: 'APT',
    decimal: 2,
  },
  {
    id: 'dogwifhat',
    name: 'dogwifhat',
    symbol: 'WIF',
    decimal: 2,
  },
  {
    id: 'arbitrum',
    name: 'Arbitrum',
    symbol: 'ARB',
    decimal: 4,
  },
  {
    id: 'optimism',
    name: 'Optimism',
    symbol: 'OP',
    decimal: 2,
  },
  {
    id: 'bonk',
    name: 'Bonk',
    symbol: 'BONK',
    decimal: 8,
  },
  {
    id: 'sui',
    name: 'Sui',
    symbol: 'SUI',
    decimal: 4,
  },
]

export const INVERT_LOGO_COINS = ['aptos', 'near']
