<script lang="ts">
  import type { Timeseries } from '$lib/fetchHistoricalPrice'
  import { twMerge } from 'tailwind-merge'
  import Plot from './Plot.svelte'
  import Logo from './Logo.svelte'
  import CpuMonitor from './CPUMonitor.svelte'
  import GpuMonitor from './GPUMonitor.svelte'
  import type { CreateQueryResult } from '@tanstack/svelte-query'
  import { COIN_LIST } from '$lib/coins'

  export let query: CreateQueryResult<Timeseries, Error>
  export let width = 640
  export let demoMode = false
  export let interval = '24h'
  export let coin = 'solana'
  export let theme = 'dark'
  export let showCPUMonitor = true
  export let showGPUMonitor = true
  export let cpuTemp = 69
  export let gpuTemp = 42
  export let cpuHighTemp = 90
  export let cpuLowTemp = 20
  export let gpuHighTemp = 90
  export let gpuLowTemp = 20

  $: currentPrice = $query.data?.at(-1)?.close ?? 1

  $: change = ($query.data?.at(-1)?.close ?? 1) - ($query.data?.at(0)?.close ?? 1)
  $: isUp = change > 0 ? true : false

  $: changePct = change / ($query.data?.at(-1)?.close ?? 1)
  $: changePctString = `${isUp ? '+' : ''}${(changePct * 100).toFixed(2)}%`

  $: decimals = currentPrice >= 1000 ? 1 : currentPrice >= 1 ? 2 : currentPrice >= 0.001 ? 4 : 8

  function getCurrentPriceString(price: number, decimals: number) {
    if (decimals <= 4) {
      return price.toFixed(decimals)
    }
    const exponential = Number(currentPrice.toFixed(decimals)).toExponential()
    const [significantDigits, zeroes] = exponential.split('e-')
    return [(Number(zeroes) - 1).toString(), significantDigits.replace('.', '')]
  }

  $: currentPriceString = getCurrentPriceString(currentPrice, decimals)
</script>

<div
  class={twMerge(
    'relative flex flex-col justify-center items-center select-none',
    theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black',
    `w-[640px] aspect-square`,
    demoMode ? 'rounded-full scale-50 origin-top-left' : 'rounded-none scale-100',
  )}
>
  {#if $query.isPending}
    <p class="text-4xl">Loading...</p>
  {:else if $query.isError}
    <p class="text-4xl">Error</p>
  {:else}
    <div class="absolute">
      <Plot data={$query.data} {width} />
    </div>
    <div class="flex flex-col items-center relative z-10">
      <p class="current-price w-full font-medium text-[120px] leading-none text-center">
        {#if typeof currentPriceString === 'string'}
          {currentPriceString}
        {:else}
          <span
            >.0<sub class="text-[48px]">{currentPriceString[0]}</sub>{currentPriceString[1]}</span
          >
        {/if}
      </p>
      <div class="absolute top-[120%] flex gap-2 items-center text-[30px] font-medium">
        <span>{interval}</span>
        <span class={isUp ? 'text-accent-green' : 'text-accent-red'}>
          {changePctString}
        </span>
      </div>
      <div class="absolute flex gap-2 bottom-[120%] font-medium text-[36px]">
        <Logo {coin} size={36} {theme} />
        <span class="whitespace-nowrap"
          >{COIN_LIST.find((coinObj) => coinObj.id === coin)?.name}</span
        >
      </div>
    </div>
    <div class="absolute w-[640px] h-[640px]">
      {#if showGPUMonitor}
        <GpuMonitor {theme} minTemp={gpuLowTemp} maxTemp={gpuHighTemp} temp={gpuTemp} />
      {/if}
      {#if showCPUMonitor}
        <CpuMonitor {theme} minTemp={cpuLowTemp} maxTemp={cpuHighTemp} temp={cpuTemp} />
      {/if}
    </div>
  {/if}
</div>
