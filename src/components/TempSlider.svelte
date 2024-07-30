<script lang="ts">
  import { Slider } from 'bits-ui'
  import { twMerge } from 'tailwind-merge'

  export let value = [50]
</script>

<div class="w-full md:max-w-[280px]">
  <Slider.Root
    bind:value
    let:thumbs
    class="relative flex w-full touch-none select-none items-center py-[14px]"
  >
    <span
      class={twMerge(
        'relative h-2 w-full grow overflow-hidden rounded-full',
        'bg-background-light-2 dark:bg-background-dark-2',
        'border border-border-light dark:border-border-dark',
      )}
    >
      <Slider.Range class="absolute h-full bg-solid-light" />
    </span>
    {#each thumbs as thumb}
      <Slider.Thumb
        {thumb}
        class={twMerge(
          'block size-[24px] cursor-pointer rounded-full',
          'border border-border-light dark:border-border-dark',
          'bg-background-light-1 shadow',
          'transition-colors hover:border-dark-40',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2',
          'active:scale-98 disabled:pointer-events-none disabled:opacity-50',
        )}
      />
    {/each}
  </Slider.Root>
  {value}
</div>
