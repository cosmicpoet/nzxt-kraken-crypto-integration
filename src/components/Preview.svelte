<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query'
  import Display from '$components/Display.svelte'
  import {
    interval,
    theme,
    showGPUMonitor,
    showCPUMonitor,
    cpuHighTemp,
    cpuLowTemp,
    gpuHighTemp,
    gpuLowTemp,
    previewModel,
    previewCPUTemp,
    previewGPUTemp,
  } from '$stores/configurator'
  import { fetchHistoricalPrice } from '$lib/fetchHistoricalPrice'
  import SelectModel from './SelectModel.svelte'
  import TempSlider from './TempSlider.svelte'

  $: cryptoQuery = createQuery({
    queryKey: ['crypto', 'data', $interval],
    queryFn: async () => await fetchHistoricalPrice($interval),
    refetchInterval: 60000,
  })

  $: cpuTempInput = [69]
  $: gpuTempInput = [42]

  $: previewCPUTemp.set(cpuTempInput[0])
  $: previewGPUTemp.set(gpuTempInput[0])
</script>

<div class="space-y-8">
  <h2 class="text-xl font-medium text-title-light dark:text-title-dark">Preview</h2>
  <div class="flex flex-col">
    <label class="text-sm" for="interval">Cooler Model</label>
    <SelectModel />
  </div>
  <div class="flex flex-col">
    <label class="text-sm" for="interval">CPU Temperature</label>
    <TempSlider bind:value={cpuTempInput} />
  </div>
  <div class="flex flex-col">
    <label class="text-sm" for="interval">GPU Temperature</label>
    <TempSlider bind:value={gpuTempInput} />
  </div>
  <div class="relative">
    <img src={`${$previewModel}.png`} alt="Kraken Elite Display" />
    <div class="absolute left-[73px] top-[92px]">
      <Display
        query={cryptoQuery}
        demoMode={true}
        interval={$interval}
        theme={$theme}
        showCPUMonitor={$showCPUMonitor}
        showGPUMonitor={$showGPUMonitor}
        cpuHighTemp={$cpuHighTemp}
        cpuLowTemp={$cpuLowTemp}
        gpuHighTemp={$gpuHighTemp}
        gpuLowTemp={$gpuLowTemp}
        cpuTemp={$previewCPUTemp}
        gpuTemp={$previewGPUTemp}
      />
    </div>
  </div>
</div>
