<script lang="ts">
  import { page } from '$app/stores'
  import Display from '$components/Display.svelte'
  import { COIN_LIST } from '$lib/coins'
  import { fetchHistoricalPrice } from '$lib/fetchHistoricalPrice'
  import { createQuery } from '@tanstack/svelte-query'
  import { twMerge } from 'tailwind-merge'
  import type { MonitoringData } from '@nzxt/web-integrations-types/v1'
  import { onMount } from 'svelte'

  let searchParams: URLSearchParams | undefined

  onMount(() => {
    searchParams = $page.url.searchParams
  })

  $: coin = searchParams?.get('coin') ?? 'solana'
  $: coinSymbol = COIN_LIST.find((coinObj) => coinObj.id === coin)?.symbol ?? 'SOL'
  $: interval = searchParams?.get('interval') ?? '24h'
  $: theme = searchParams?.get('theme') ?? 'dark'
  $: showCPUMonitor = searchParams?.get('showCPUMonitor') !== '0'
  $: showGPUMonitor = searchParams?.get('showGPUMonitor') !== '0'
  $: cpuHighTemp = Number(searchParams?.get('cpuHighTemp') ?? 90)
  $: cpuLowTemp = Number(searchParams?.get('cpuLowTemp') ?? 20)
  $: gpuHighTemp = Number(searchParams?.get('gpuHighTemp') ?? 90)
  $: gpuLowTemp = Number(searchParams?.get('gpuLowTemp') ?? 20)

  $: cryptoQuery = createQuery({
    queryKey: ['crypto', 'data', interval],
    queryFn: async () => await fetchHistoricalPrice(coinSymbol, interval),
    refetchInterval: 60000,
  })

  let cpuTemp = 0
  let gpuTemp = 0

  onMount(() => {
    window.nzxt = {
      v1: {
        onMonitoringDataUpdate: (data: MonitoringData) => {
          const { cpus, gpus } = data
          cpuTemp = Math.floor(cpus[0].temperature?.valueOf() ?? 50)
          gpuTemp = Math.floor(gpus[0].temperature?.valueOf() ?? 50)
        },
        width: 600,
        height: 600,
        shape: 'circle',
        targetFps: 1,
      },
    }
  })
</script>

<div
  class={twMerge(
    'flex w-screen h-screen justify-center items-center',
    theme === 'dark' ? 'bg-black' : 'bg-white',
  )}
>
  <Display
    query={cryptoQuery}
    demoMode={false}
    {interval}
    {coin}
    {theme}
    {showCPUMonitor}
    {showGPUMonitor}
    {cpuHighTemp}
    {cpuLowTemp}
    {gpuHighTemp}
    {gpuLowTemp}
    {cpuTemp}
    {gpuTemp}
  />
</div>
