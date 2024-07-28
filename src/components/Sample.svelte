<script>
  import { onMount } from 'svelte'
  import * as d3 from 'd3'

  let linePath
  let gradientStops

  // Sample data
  const data = [
    { x: 10, y: 300 },
    { x: 150, y: 100 },
    { x: 300, y: 300 },
    { x: 450, y: 200 },
    { x: 590, y: 300 },
  ]

  // Create scales
  const xScale = d3.scaleLinear().domain([0, 600]).range([0, 600])
  const yScale = d3.scaleLinear().domain([0, 400]).range([400, 0])

  // Create line generator
  const lineGenerator = d3
    .line()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))

  // Generate the line path
  linePath = lineGenerator(data)

  // Calculate gradient stops
  $: gradientStops = data
    .map((d) => ({
      offset: `${(d.x / 600) * 100}%`,
      color: 'red',
      opacity: 1,
    }))
    .concat(
      data.map((d) => ({
        offset: `${(d.x / 600) * 100}%`,
        color: 'red',
        opacity: 0,
        y: yScale(d.y) + 50,
      })),
    )
</script>

<svg width="600" height="400">
  <!-- Define the gradient -->
  <defs>
    <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
      {#each gradientStops as stop}
        <stop offset={stop.offset} stop-color={stop.color} stop-opacity={stop.opacity} />
      {/each}
    </linearGradient>
  </defs>

  <!-- Draw the line -->
  <path d={linePath} fill="none" stroke="red" stroke-width="2" />

  <!-- Draw the area below the line with the gradient fill -->
  <path d={`${linePath} L 600 400 L 0 400 Z`} fill="url(#lineGradient)" />
</svg>
