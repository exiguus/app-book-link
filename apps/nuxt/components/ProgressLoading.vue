<template>
  <div class="progress-loading">
    <ProgressSpinner :style="style"></ProgressSpinner>
  </div>
</template>

<script setup lang="ts">
import { reactive, StyleValue } from 'vue'
import ProgressSpinner from './ProgressSpinner.vue'

function style(): StyleValue {
  return reactive({
    position: 'absolute',
    top: '50%',
    left: '50%',
    display: 'block',
    'margin-top': '-1em',
    'margin-left': '-1em',
    'font-size': '12px'
  } as const)
}
</script>

<style scoped>
.progress-loading {
  position: relative;
  display: block;
  width: 100%;
  max-width: 100vw;
  min-width: 100%;
  height: 100%;
  min-height: 16rem;
  margin: 0.5rem;
}
</style>
