<template>
  <div class="logo-claim">
    <img class="logo" alt="book_link logo" src="@/assets/logo.svg" width="64" height="64" />
    <h1 class="green">
      {{ msg }}
    </h1>
    <h2 class="use-claim">
      Use <strong class="green">book_link</strong> to find and share your book
    </h2>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h2 {
  font-size: 1.2rem;
}

.logo {
  display: block;
  width: 64px;
}

.logo-claim {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
}
</style>
