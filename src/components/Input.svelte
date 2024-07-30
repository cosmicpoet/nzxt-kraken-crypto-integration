<script lang="ts">
  import type { HTMLInputTypeAttribute } from 'svelte/elements'
  import { twMerge } from 'tailwind-merge'

  export let value: any
  export let type: HTMLInputTypeAttribute = 'text'
</script>

<input
  class={twMerge(
    'inline-flex h-10 w-full items-center rounded-md px-[11px] text-sm',
    'bg-background-light-1 dark:bg-background-dark-1',
    'border border-border-light dark:border-border-dark',
    'transition-colors placeholder:text-neutral-500',
    'focus:outline-none focus:ring-2 focus:ring-solid-light',
  )}
  bind:value
  {...{ type }}
/>
