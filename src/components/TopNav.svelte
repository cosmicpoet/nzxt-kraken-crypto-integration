<script>
  import { twMerge } from 'tailwind-merge'
  import DarkMode from './DarkMode.svelte'
</script>

<nav
  class={twMerge(
    'w-full h-16 flex justify-center items-center border-b border-bg-neutral-300',
    'dark:bg-neutral-900 dark:border-neutral-600 dark:text-white',
  )}
>
  <div class="container flex justify-between items-center">
    <h1 class="font-semibold text-2xl">NZXT Kraken Crypto Integration</h1>
    <DarkMode />
  </div>
</nav>
