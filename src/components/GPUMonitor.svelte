<script lang="ts">
  import Color from 'colorjs.io'
  import { twMerge } from 'tailwind-merge'

  export let maxOffset = 304
  export let minTemp = 20
  export let maxTemp = 90
  export let temp = 42
  export let theme

  $: progress = Math.max(Math.min((temp - minTemp) / (maxTemp - minTemp), 1), 0)

  let red = new Color('#ff3200')
  $: yellow = theme === 'dark' ? new Color('#c8ff00') : new Color('#a9d800')
  $: yellowRed = yellow.range(red, { space: 'lch', outputSpace: 'srgb' })
  $: color = yellowRed(progress)
</script>

<div
  class={twMerge(
    'absolute w-full h-full flex flex-col items-center',
    theme === 'dark' ? 'text-white' : 'text-black',
  )}
>
  <svg viewBox="0 0 640 640">
    <path
      d="M 175 571 A 290 290 0 0 0 465 571"
      fill="none"
      stroke={theme === 'dark' ? '#222' : '#eee'}
      stroke-width="15"
      stroke-linecap="round"
    />
    <path
      d="M 175 571 A 290 290 0 0 0 465 571"
      fill="none"
      stroke={color.toString()}
      stroke-width="15"
      stroke-linecap="round"
      stroke-dasharray={maxOffset}
      stroke-dashoffset={(1 - progress) * maxOffset}
    />
  </svg>
  <div class="absolute bottom-14">
    <p class="text-[30px] font-medium">
      GPU <span style="color: {color.toString()};">{temp}</span>°
    </p>
  </div>
</div>
