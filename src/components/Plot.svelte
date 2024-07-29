<script lang="ts">
  import type { Timeseries, TimeseriesEntry } from '$lib/fetchHistoricalPrice'
  import * as d3 from 'd3'

  export let data: Timeseries
  export let width = 640
  export let height = width / 2
  export let marginTop = 30
  export let marginRight = 30
  export let marginBottom = 30
  export let marginLeft = 30
  export let red = '#ff364d'
  export let green = '#58dd68'

  $: change = (data.at(-1)?.close ?? 1) - (data.at(0)?.close ?? 1)
  $: isUp = change > 0 ? true : false
  $: color = isUp ? green : red

  $: x = d3.scaleTime(
    [data.at(0)?.timestamp ?? new Date(0), data.at(-1)?.timestamp ?? new Date()],
    [marginLeft, width - marginRight],
  )

  $: y = d3
    .scaleLinear()
    .domain(d3.extent(data.map((datum) => datum.close)) as [number, number])
    .range([height - marginBottom, marginTop])

  $: line = d3
    .line(
      (d: TimeseriesEntry) => x(d.timestamp),
      (d: TimeseriesEntry) => y(d.close),
    )
    .curve(d3.curveCardinal)

  $: area = d3
    .area(
      (d: TimeseriesEntry) => x(d.timestamp),
      (d: TimeseriesEntry) => height - marginBottom,
      (d: TimeseriesEntry) => y(d.close),
    )
    .curve(d3.curveCardinal)
</script>

<svg {width} {height} class="opacity-40">
  <defs>
    <linearGradient id="lineGradient" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color={color} stop-opacity="1" />
      <stop offset="100%" stop-color={color} stop-opacity="0" />
    </linearGradient>

    <mask id="mask1" x="0" y="0" {width} {height}>
      <path d={area(data)} fill="url(#lineGradient)" />
    </mask>
  </defs>

  <!-- Line -->
  <path fill="none" stroke={color} stroke-width="6" d={line(data)} />

  <!-- Area -->
  <rect x="0" y="0" {width} {height} fill={color} mask="url(#mask1)" />
</svg>
