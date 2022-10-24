<script setup>
import {useDark, useToggle} from '@vueuse/core'
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <button @click="toggleDark()" class="px-4 py-2 text-white bg-blue-500 rounded dark:bg-purple-500">
    Toggle Dark Mode
  </button>
</template>