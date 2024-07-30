<script lang="ts">
  import { Select } from 'bits-ui'
  import ChevronDownIcon from '$components/icons/ChevronDownIcon.svelte'
  import { twMerge } from 'tailwind-merge'
  import { previewModel } from '$stores/configurator'
  import { onDestroy } from 'svelte'
  import CheckIcon from '$components/icons/CheckIcon.svelte'

  type SelectItem = { value: string; label: string }

  const items: SelectItem[] = [
    { value: 'kraken_elite', label: 'Kraken Elite (Black)' },
    { value: 'kraken_elite_white', label: 'Kraken Elite (White)' },
  ]

  export let placeholder: string = 'Select an Interval...'

  let isOpen = false

  const defaultSelected = items[0]
  let selected: SelectItem = defaultSelected

  let intervalValue: string
  const unsubscribe = previewModel.subscribe((value) => {
    intervalValue = value
  })

  function setModel(value: string) {
    previewModel.set(value)
  }

  onDestroy(unsubscribe)
</script>

<Select.Root
  {items}
  bind:selected
  onSelectedChange={(selected) => {
    setModel(selected?.value ?? '24h')
  }}
  onOpenChange={() => (isOpen = !isOpen)}
>
  <Select.Trigger
    class={twMerge(
      'inline-flex h-10 w-full items-center rounded-md px-[11px] text-sm',
      'border border-border-light dark:border-border-dark',
      'transition-colors placeholder:text-neutral-500',
      'focus:outline-none focus:ring-2 focus:ring-solid-light',
    )}
    aria-label="Select an Interval"
  >
    <Select.Value class="text-sm" {placeholder} />
    <ChevronDownIcon class={twMerge('ml-auto size-6', isOpen && 'rotate-180')} />
  </Select.Trigger>
  <Select.Content
    class={twMerge(
      'w-full rounded-md border border-neutral-300 px-1 py-2 shadow-md outline-none',
      'bg-background-light-2 dark:bg-background-dark-2',
    )}
    sideOffset={8}
  >
    {#each items as item}
      <Select.Item
        class={twMerge(
          'flex h-10 w-full select-none items-center',
          'rounded-md py-3 pl-5 pr-1.5 text-sm outline-none',
          'transition-all duration-100 data-[highlighted]:bg-solid-light',
          'text-black dark:text-white dark:data-[highlighted]:text-black',
        )}
        value={item.value}
        label={item.label}
      >
        {item.label}
        <Select.ItemIndicator class="ml-auto" asChild={false}>
          <CheckIcon class="size-6" />
        </Select.ItemIndicator>
      </Select.Item>
    {/each}
  </Select.Content>
  <Select.Input name="favoriteFruit" />
</Select.Root>
