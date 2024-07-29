<script>
  import Color from 'colorjs.io'
  import { twMerge } from 'tailwind-merge'

  export let maxOffset = 304
  export let minTemp = 20
  export let maxTemp = 90
  export let temp = 30
  let progress = (temp - minTemp) / (maxTemp - minTemp)
  progress = Math.max(Math.min(progress, 1), 0)

  let red = new Color('#ff3200')
  let yellow = new Color('#c8ff00')
  let yellowRed = yellow.range(red, { space: 'lch', outputSpace: 'srgb' })
  let color = yellowRed(progress)
</script>

<div class="relative flex flex-col items-center">
  <svg viewbox="0 0 640 640">
    <path
      d="M 175 69 A 290 290 0 0 1 465 69"
      fill="none"
      stroke="#222"
      stroke-width="15"
      stroke-linecap="round"
    />
    <path
      d="M 175 69 A 290 290 0 0 1 465 69"
      fill="none"
      stroke={color.toString()}
      stroke-width="15"
      stroke-linecap="round"
      stroke-dasharray={maxOffset}
      stroke-dashoffset={(1 - progress) * maxOffset}
    />
  </svg>
  <div class="absolute top-14">
    <p class="text-white text-[30px] font-medium">
      CPU <span style="color: {color.toString()};">{temp}</span>°
    </p>
  </div>
</div>
