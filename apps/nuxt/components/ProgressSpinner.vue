<template>
  <span :style="style()"></span>
</template>

<script setup lang="ts">
import type { StyleValue } from 'vue'

defineProps<{
  style: () => StyleValue
}>()
</script>

<style lang="scss" scoped>
$spinnerHeight: 2rem;
$spinnerWidth: 2rem;
$spinnerBorder: 0.2rem;

span {
  position: relative;
  display: block;
  width: $spinnerWidth;
  height: $spinnerHeight;
  margin: $spinnerHeight auto;
  font-size: 4rem;
  text-indent: -999px;
  border-top: $spinnerBorder solid rgba(255, 255, 255, 0.2);
  border-right: $spinnerBorder solid rgba(255, 255, 255, 0.2);
  border-bottom: $spinnerBorder solid rgba(255, 255, 255, 0.2);
  border-left: $spinnerBorder solid var(--color-primary);
  border-radius: 50%;
  transform: translateZ(0);
  animation: Loading 1.1s infinite linear;

  &::after {
    position: relative;
    display: block;
    width: $spinnerWidth;
    height: $spinnerHeight;
    border-radius: 100%;
  }

  @keyframes Loading {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
