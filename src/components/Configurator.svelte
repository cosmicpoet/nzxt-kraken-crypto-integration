<script lang="ts">
  import SelectTheme from '$components/SelectTheme.svelte'
  import SelectCoin from '$components/SelectCoin.svelte'
  import SelectInterval from '$components/SelectInterval.svelte'
  import ShowCpuSwitch from '$components/ShowCPUSwitch.svelte'
  import ShowGpuSwitch from '$components/ShowGPUSwitch.svelte'
  import {
    theme,
    coin,
    interval,
    showCPUMonitor,
    cpuHighTemp,
    cpuLowTemp,
    showGPUMonitor,
    gpuHighTemp,
    gpuLowTemp,
  } from '$stores/configurator'
  import Input from './Input.svelte'
  import { page } from '$app/stores'
  import UrlResultInput from './URLResultInput.svelte'

  $: cpuLowTempInput = 20
  $: cpuHighTempInput = 90
  $: gpuLowTempInput = 20
  $: gpuHighTempInput = 90

  $: cpuHighTemp.set(cpuHighTempInput)
  $: cpuLowTemp.set(cpuLowTempInput)
  $: gpuHighTemp.set(gpuHighTempInput)
  $: gpuLowTemp.set(gpuLowTempInput)

  type Configuration = {
    theme: string
    coin: string
    interval: string
    showCPUMonitor: number
    showGPUMonitor: number
    cpuHighTemp?: number
    cpuLowTemp?: number
    gpuHighTemp?: number
    gpuLowTemp?: number
  }

  $: configuration = {
    theme: $theme,
    coin: $coin,
    interval: $interval,
    showCPUMonitor: $showCPUMonitor ? 1 : 0,
    showGPUMonitor: $showGPUMonitor ? 1 : 0,
  } as Configuration

  $: if ($showCPUMonitor) {
    configuration = {
      ...configuration,
      cpuHighTemp: $cpuHighTemp,
      cpuLowTemp: $cpuLowTemp,
    }
  }

  $: if ($showGPUMonitor) {
    configuration = {
      ...configuration,
      gpuHighTemp: $gpuHighTemp,
      gpuLowTemp: $gpuLowTemp,
    }
  }

  function generateUrl(config: any) {
    let searchParams = new URLSearchParams(config)
    let url = new URL($page.url.origin + '/render')
    url.search = searchParams.toString()
    return url
  }

  $: renderUrl = generateUrl(configuration)
</script>

<div class="flex flex-col gap-8">
  <h2 class="text-xl font-medium text-title-light dark:text-title-dark">Configuration</h2>
  <div class="space-y-12">
    <form class="flex flex-col gap-4">
      <div class="flex flex-col gap-0.5">
        <label class="text-sm" for="interval">Theme</label>
        <SelectTheme />
      </div>
      <div class="flex flex-col gap-0.5">
        <label class="text-sm" for="interval">Coin</label>
        <SelectCoin />
      </div>
      <div class="flex flex-col gap-0.5">
        <label class="text-sm" for="interval">Interval</label>
        <SelectInterval />
      </div>
      <div class="flex gap-2 items-center">
        <label class="text-sm" for="interval">Show CPU Monitor</label>
        <ShowCpuSwitch />
      </div>
      {#if $showCPUMonitor}
        <div class="flex flex-col gap-0.5">
          <label class="text-sm" for="interval">CPU Low Temperature</label>
          <Input bind:value={cpuLowTempInput} type="number" />
        </div>
        <div class="flex flex-col gap-0.5">
          <label class="text-sm" for="interval">CPU High Temperature</label>
          <Input bind:value={cpuHighTempInput} type="number" />
        </div>
      {/if}
      <div class="flex gap-2 items-center">
        <label class="text-sm" for="interval">Show GPU Monitor</label>
        <ShowGpuSwitch />
      </div>
      {#if $showGPUMonitor}
        <div class="flex flex-col gap-0.5">
          <label class="text-sm" for="interval">GPU Low Temperature</label>
          <Input bind:value={gpuLowTempInput} type="number" />
        </div>
        <div class="flex flex-col gap-0.5">
          <label class="text-sm" for="interval">GPU High Temperature</label>
          <Input bind:value={gpuHighTempInput} type="number" />
        </div>
      {/if}
    </form>
    <div class="flex flex-col gap-0.5">
      <label class="text-sm text-title-light dark:text-solid-dark" for="interval">
        Web Integration URL
      </label>
      <UrlResultInput bind:value={renderUrl} />
      <a
        rel="noopenner noreferrer"
        target="_blank"
        class="text-sm text-title-light dark:text-title-dark"
        href={renderUrl.toString()}>Visit Now</a
      >
    </div>
  </div>
</div>
