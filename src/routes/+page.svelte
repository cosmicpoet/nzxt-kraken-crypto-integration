<script>
  import Display from '../components/Display.svelte'
  import Sample from '../components/Sample.svelte'
  import { onMount } from 'svelte'
  import { invalidateAll } from '$app/navigation'

  export let data

  onMount(() => {
    const interval = setInterval(() => {
      invalidateAll()
    }, 60000)

    return () => clearInterval(interval)
  })
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<Display timeseries={data.timeseries} current={data.current} demoMode={true} />
