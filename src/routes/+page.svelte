<script>
  import TopNav from '$components/TopNav.svelte'
  import Configurator from '$components/Configurator.svelte'
  import Preview from '$components/Preview.svelte'
  import { twMerge } from 'tailwind-merge'
</script>

<TopNav />
<main
  class={twMerge(
    'flex flex-col gap-8 items-center',
    'min-h-svh',
    'bg-background-light-1 dark:text-white dark:bg-background-dark-1 py-16',
  )}
>
  <div>
    <div class="container grid grid-cols-2 gap-36 pt-16">
      <Configurator />
      <Preview />
    </div>
    <div class="container space-y-4">
      <h2 class="text-xl font-medium text-title-light dark:text-title-dark">Notes</h2>
      <p>
        This website generates web integration pages for NZXT's Kraken series liquid coolers. Some
        limited configurations are allowed to customize the appearance.
      </p>
      <p>
        It utilizes the free public API from OKX as the data provider. A user will be calling it
        directly via this app every 60 seconds. This ensures the integration could be quickly
        deployed to your cooler display without any special tweaking, whereas OKX is a reputable CEX
        with reliable and accurate (enough) market data.
      </p>
      <p>
        Only select high-profile cryptocurrencies are included due to data availability and the
        manual labor of collecting cryptocurrency logo. You are welcome to submit a PR if you would
        like to add some currency not listed on this website (if the data provider has the data).
      </p>
      <p>
        Usage of this software is free under MIT License. It is more intended as an eyecandy for PC
        builders who are using NZXT Kraken coolers and also happen to be a crypto fan. It is NOT
        intended for financial uses and I am not liable for any losses incurred to the user while
        using this software.
      </p>
    </div>
  </div>
</main>
