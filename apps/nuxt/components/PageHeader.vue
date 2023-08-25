<template>
  <HelloWorld msg="Find your Book!" />
  <nav>
    <NuxtLink to="/"> Home </NuxtLink>
    <NuxtLink to="/about"> About </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
import HelloWorld from './HelloWorld.vue'
</script>

<style scoped>
nav {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 12px;
  margin-bottom: 1rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  nav {
    font-size: 1rem;
    padding: 1rem 0;
  }
}
</style>
