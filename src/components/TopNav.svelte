<script>
  import { twMerge } from 'tailwind-merge'
  import DarkMode from './DarkMode.svelte'
</script>

<nav
  class={twMerge(
    'fixed w-full h-16 flex justify-center items-center bg-background-light-2 border-b border-border-light',
    'dark:bg-background-dark-2 dark:border-border-dark',
  )}
>
  <div class="container flex justify-between items-center">
    <h1 class="font-semibold text-2xl text-title-light dark:text-title-dark">
      NZXT Kraken Crypto Integration
    </h1>
    <DarkMode />
  </div>
</nav>
