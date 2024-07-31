<script lang="ts">
  import { onMount } from 'svelte'
  import { twMerge } from 'tailwind-merge'
  import SunIcon from './icons/SunIcon.svelte'
  import MoonIcon from './icons/MoonIcon.svelte'
  // import type { SubmitFunction } from '@sveltejs/kit'
  // import { enhance } from '$app/forms'

  let darkMode: boolean
  let mounted: boolean = false

  onMount(() => {
    mounted = true
    const userPrefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    const hasUserSetThemeManually = document.documentElement.getAttribute('data-theme') !== 'system'

    if (!hasUserSetThemeManually) {
      darkMode = userPrefersDarkMode
      setTheme(darkMode ? 'dark' : 'light')
    } else {
      if (document.documentElement.getAttribute('data-theme') === 'dark') {
        darkMode = true
      } else {
        darkMode = false
      }
    }
  })

  const setTheme = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme)
    document.cookie = `colortheme=${theme}; max-age=${60 * 60 * 24 * 365}; path=/`
  }

  function toggleClient() {
    darkMode = !darkMode
    setTheme(darkMode ? 'dark' : 'light')
  }
</script>

<!-- <form method="POST" use:enhance={submitUpdateTheme}> -->
{#if mounted}
  <button
    on:click={toggleClient}
    class={twMerge(
      'flex items-center h-[30px] p-[1px] w-12 border rounded-full',
      darkMode ? 'bg-[#272962] border-[#5753C6]' : 'bg-[#BEE7F5] border-[#7CE2FE]',
      'shadow-inner',
    )}
  >
    <span
      class={twMerge(
        'flex justify-center items-center rounded-full w-[26px] h-[26px] bg-white',
        darkMode ? 'translate-x-[18px] bg-neutral-800 border-[#5753C6]' : 'bg-white',
        'transition-all duration-200',
        'drop-shadow-md',
      )}
    >
      {#if darkMode}
        <MoonIcon classes="size-4 fill-[#FFE629]" />
      {:else}
        <SunIcon classes="size-4 fill-[#F76B15]" />
      {/if}
    </span>
  </button>
{/if}
<!-- </form> -->
