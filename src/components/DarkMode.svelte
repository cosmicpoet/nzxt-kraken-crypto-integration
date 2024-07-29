<script lang="ts">
  import { onMount } from 'svelte'
  import { twMerge } from 'tailwind-merge'
  import SunIcon from './icons/SunIcon.svelte'
  import MoonIcon from './icons/MoonIcon.svelte'
  import type { SubmitFunction } from '@sveltejs/kit'
  import { enhance } from '$app/forms'

  let darkMode: boolean
  let mounted: boolean = false

  function toggleClient() {
    darkMode = !darkMode
  }

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

  const submitUpdateTheme: SubmitFunction = ({ action }) => {
    const theme = action.searchParams.get('theme')
    if (theme) {
      setTheme(theme)
    }
  }

  const setTheme = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme)
  }
</script>

<form method="POST" use:enhance={submitUpdateTheme}>
  {#if mounted}
    <button
      on:click={toggleClient}
      formaction={`/?/setTheme&theme=${darkMode ? 'dark' : 'light'}`}
      class={twMerge(
        'flex items-center h-[30px] p-[1px] w-12 border border-neutral-300 rounded-full',
        darkMode ? 'bg-neutral-700 border-neutral-600' : 'bg-yellow-300',
      )}
    >
      <span
        class={twMerge(
          'flex justify-center items-center border-neutral-300 border rounded-full w-[26px] h-[26px] bg-white',
          darkMode ? 'translate-x-[18px] bg-neutral-800 border-neutral-700' : 'bg-white',
          'transition-all duration-200',
        )}
      >
        {#if darkMode}
          <MoonIcon classes="size-4 fill-yellow-300" />
        {:else}
          <SunIcon classes="size-4 fill-red-300" />
        {/if}
      </span>
    </button>
  {/if}
</form>
