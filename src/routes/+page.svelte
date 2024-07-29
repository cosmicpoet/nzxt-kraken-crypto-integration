<script>
  import Display from '$components/Display.svelte'
  import { onMount } from 'svelte'
  import { invalidateAll } from '$app/navigation'
  import TopNav from '$components/TopNav.svelte'
  import Configurator from '$components/Configurator.svelte'

  export let data

  onMount(() => {
    const interval = setInterval(() => {
      invalidateAll()
    }, 60000)

    return () => clearInterval(interval)
  })
</script>

<TopNav />
<main class="flex flex-col items-center dark:text-white dark:bg-neutral-800 h-full">
  <div class="container grid grid-cols-2 gap-8 pt-16">
    <Configurator />
    <div class="space-y-4">
      <h2 class="text-xl font-medium">Preview</h2>
      <div class="relative">
        <img src="kraken_elite.png" alt="Kraken Elite Display" />
        <div class="absolute left-[73px] top-[92px]">
          <Display timeseries={data.timeseries} current={data.current} demoMode={true} />
        </div>
      </div>
    </div>
  </div>
</main>
