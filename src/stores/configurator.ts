import { writable } from 'svelte/store'

export const theme = writable('dark')

export const interval = writable('24h')

function createShowCPUMonitor() {
  const { subscribe, update, set } = writable(true)
  return {
    subscribe,
    toggle: () => update((value) => !value),
    set: (value: boolean) => set(value),
  }
}

export const showCPUMonitor = createShowCPUMonitor()

function createShowGPUMonitor() {
  const { subscribe, update, set } = writable(true)
  return {
    subscribe,
    toggle: () => update((value) => !value),
    set: (value: boolean) => set(value),
  }
}

export const showGPUMonitor = createShowGPUMonitor()

export const cpuLowTemp = writable(20)
export const cpuHighTemp = writable(90)
export const gpuLowTemp = writable(20)
export const gpuHighTemp = writable(90)

export const previewModel = writable('kraken_elite')
export const previewCPUTemp = writable(69)
export const previewGPUTemp = writable(42)
