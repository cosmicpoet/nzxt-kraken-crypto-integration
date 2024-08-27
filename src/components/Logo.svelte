<script>
  import { base } from '$app/paths'
  import { COIN_LIST, INVERT_LOGO_COINS } from '$lib/coins'
  import { twMerge } from 'tailwind-merge'

  export let theme
  export let coin = 'solana'
  export let size = 24
</script>

<img
  src={`${base}/logos/${coin}.svg`}
  alt="${COIN_LIST.find((coinObj) => coinObj.id === coin).name} Logo"
  class={twMerge(INVERT_LOGO_COINS.includes(coin) && theme === 'dark' && 'invert')}
  width={size}
  height={size}
/>
