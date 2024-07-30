<script>
  import SelectInterval from '$components/SelectInterval.svelte'
  import SelectTheme from '$components/SelectTheme.svelte'
  import ShowCpuSwitch from '$components/ShowCPUSwitch.svelte'
  import ShowGpuSwitch from '$components/ShowGPUSwitch.svelte'
  import { showCPUMonitor, showGPUMonitor } from '$stores/configurator'
  import Input from './Input.svelte'
  import { cpuHighTemp, cpuLowTemp, gpuHighTemp, gpuLowTemp } from '$stores/configurator'

  const intervals = [
    { value: '24h', label: '24H' },
    { value: '7d', label: '7D' },
  ]

  $: cpuLowTempInput = 20
  $: cpuHighTempInput = 90
  $: gpuLowTempInput = 20
  $: gpuHighTempInput = 90

  $: cpuHighTemp.set(cpuHighTempInput)
  $: cpuLowTemp.set(cpuLowTempInput)
  $: gpuHighTemp.set(gpuHighTempInput)
  $: gpuLowTemp.set(gpuLowTempInput)
</script>

<div class="flex flex-col gap-8">
  <h2 class="text-xl font-medium text-title-light dark:text-title-dark">Configuration</h2>
  <div>
    <form class="flex flex-col gap-4">
      <div class="flex flex-col gap-0.5">
        <label class="text-sm" for="interval">Theme</label>
        <SelectTheme />
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
  </div>
</div>
