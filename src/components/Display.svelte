<script lang="ts">
  import type { OKXIndexTicker } from '$lib/fetchCurrentPrice'
  import type { Timeseries } from '$lib/fetchHistoricalPrice'
  import { twMerge } from 'tailwind-merge'
  import Plot from './Plot.svelte'
  import Logo from './Logo.svelte'
  import CpuMonitor from './CPUMonitor.svelte'
  import GpuMonitor from './GPUMonitor.svelte'

  export let timeseries: Timeseries
  export let current: OKXIndexTicker | undefined
  export let width = 640
  export let demoMode = false

  $: change = (timeseries.at(-1)?.close ?? 1) - (timeseries.at(0)?.close ?? 1)
  $: isUp = change > 0 ? true : false

  $: changePct = change / (timeseries.at(-1)?.close ?? 1)
  $: changePctString = `${isUp ? '+' : ''}${(changePct * 100).toFixed(2)}%`
</script>

<div
  class={twMerge(
    'relative bg-black flex flex-col justify-center items-center',
    `w-[640px] aspect-square`,
    demoMode ? 'rounded-full scale-50' : 'rounded-none scale-100',
  )}
>
  <div class="absolute"><Plot data={timeseries} {width} /></div>
  <div class="flex flex-col items-center relative z-10">
    <p class="current-price w-full font-medium text-white text-[120px] leading-none text-center">
      {Number(current?.idxPx).toFixed(2)}
    </p>
    <div class="absolute top-[120%] flex gap-2 items-center text-white text-[30px] font-medium">
      <span>24h</span>
      <!-- <ArrowUp size={24} /> -->
      <span class={isUp ? 'text-accent-green' : 'text-accent-red'}>
        {changePctString}
      </span>
    </div>
    <div class="absolute flex gap-2 bottom-[120%] text-white font-medium text-[30px]">
      <Logo width={30} />Solana
    </div>
  </div>
  <div class="text-white absolute w-[640px] h-[640px]">
    <GpuMonitor />
    <CpuMonitor />
  </div>
</div>
