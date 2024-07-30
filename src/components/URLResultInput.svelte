<script lang="ts">
  import { twMerge } from 'tailwind-merge'

  export let value: any

  let hasCopied = false

  function copyToClipboard() {
    navigator.clipboard.writeText(value)
    hasCopied = true

    setTimeout(() => {
      hasCopied = false
    }, 3000)
  }
</script>

<div class="relative flex items-center">
  <input
    class={twMerge(
      'inline-flex h-10 w-full items-center rounded-md px-[11px] text-sm',
      'bg-background-light-1 dark:bg-background-dark-1',
      'border border-border-light dark:border-border-dark',
      'transition-colors placeholder:text-neutral-500',
      'focus:outline-none focus:ring-2 focus:ring-solid-light',
      'pr-[72px] text-title-light dark:text-solid-dark',
    )}
    bind:value
    disabled
  />
  <button
    class={twMerge(
      'absolute right-1 flex px-3 py-1 w-[64px] h-[32px] text-sm items-center justify-center',
      'bg-solid-light rounded-md dark:text-black',
      'transition-all hover:brightness-105',
    )}
    on:click={copyToClipboard}
    disabled={hasCopied}
  >
    {hasCopied ? 'Copied!' : 'Copy'}
  </button>
</div>
