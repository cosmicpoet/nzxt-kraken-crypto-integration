<script lang="ts">
  import { Switch } from 'bits-ui'
  import { twMerge } from 'tailwind-merge'
  import { showCPUMonitor } from '$stores/configurator'
</script>

<div class="flex items-center space-x-3">
  <Switch.Root
    class={twMerge(
      'peer inline-flex items-center h-[24px] min-h-[24px] w-[40px] shrink-0 cursor-pointer',
      'rounded-full px-[1px] transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      'border border-border-light dark:border-border-dark',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'data-[state=checked]:bg-solid-light',
      'data-[state=unchecked]:bg-background-light-2 dark:data-[state=unchecked]:bg-background-dark-2',
      'data-[state=unchecked]:shadow-inner',
    )}
    checked={$showCPUMonitor}
    onCheckedChange={(checked) => {
      showCPUMonitor.set(checked)
    }}
  >
    <Switch.Thumb
      class={twMerge(
        'pointer-events-none block size-[20px] shrink-0 rounded-full bg-background-light-1',
        'transition-transform',
        'data-[state=checked]:translate-x-[16px] data-[state=unchecked]:translate-x-0 data-[state=unchecked]:shadow-mini',
        'border border-border-light dark:border-border-dark',
        'dark:bg-foreground dark:shadow-popover dark:data-[state=unchecked]:border',
      )}
    />
  </Switch.Root>
</div>
