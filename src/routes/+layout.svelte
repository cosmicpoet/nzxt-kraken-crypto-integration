<script>
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'
  import '../app.css'
  import { browser } from '$app/environment'
  
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { enabled: browser },
    },
  })
</script>

<svelte:head>
  <title>NZXT Kraken Crypto Integration</title>
</svelte:head>

<QueryClientProvider client={queryClient}>
  <slot />
</QueryClientProvider>
