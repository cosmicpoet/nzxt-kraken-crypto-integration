<script lang="ts">
  import { Select } from 'bits-ui'
  import ChevronDownIcon from '$components/icons/ChevronDownIcon.svelte'
  import { twMerge } from 'tailwind-merge'
  import { coin, interval } from '$stores/configurator'
  import { onDestroy } from 'svelte'
  import CheckIcon from '$components/icons/CheckIcon.svelte'
  import { COIN_LIST, INVERT_LOGO_COINS } from '$lib/coins'

  type SelectItem = { value: string; label: string }

  const items: SelectItem[] = COIN_LIST.map((coin) => ({
    value: coin.id,
    label: `${coin.name} (${coin.symbol})`,
  }))

  export let placeholder: string = 'Select a Coin...'

  let isOpen = false

  const defaultSelected = items.find((item) => item.value === 'solana') ?? items[0]
  let selected: SelectItem = defaultSelected

  let coinValue: string
  const unsubscribe = interval.subscribe((value) => {
    coinValue = value
  })

  function setCoin(value: string) {
    coin.set(value)
  }

  onDestroy(unsubscribe)
</script>

<Select.Root
  {items}
  bind:selected
  onSelectedChange={(selected) => {
    setCoin(selected?.value ?? 'solana')
  }}
  onOpenChange={() => (isOpen = !isOpen)}
>
  <Select.Trigger
    class={twMerge(
      'inline-flex gap-2 h-10 w-full items-center rounded-md px-[11px] text-sm',
      'border border-border-light dark:border-border-dark',
      'transition-colors placeholder:text-neutral-500',
      'focus:outline-none focus:ring-2 focus:ring-solid-light',
    )}
    aria-label="Select an Interval"
  >
    <img
      src={`logos/${selected.value}.svg`}
      alt={`${selected.label} Logo`}
      class={twMerge('size-6', INVERT_LOGO_COINS.includes(selected.value) && 'dark:invert')}
    />
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
          'flex gap-2 h-10 w-full select-none items-center',
          'rounded-md py-3 pl-5 pr-1.5 text-sm outline-none',
          'transition-all duration-100 data-[highlighted]:bg-solid-light',
          'text-black dark:text-white dark:data-[highlighted]:text-black',
        )}
        value={item.value}
        label={item.label}
      >
        <img
          src={`logos/${item.value}.svg`}
          alt={`${item.label} Logo`}
          class={twMerge('size-6', INVERT_LOGO_COINS.includes(item.value) && 'dark:invert')}
        />
        <span>{item.label}</span>
        <Select.ItemIndicator class="ml-auto" asChild={false}>
          <CheckIcon class="size-6" />
        </Select.ItemIndicator>
      </Select.Item>
    {/each}
  </Select.Content>
  <Select.Input name="favoriteFruit" />
</Select.Root>
