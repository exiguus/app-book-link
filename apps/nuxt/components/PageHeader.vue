<template>
  <div class="search">
    <header>
      <HelloWorld msg="Find your Book!" />
    </header>
    <nav>
      <NuxtLink to="/"> Home </NuxtLink>
      <NuxtLink to="/about"> About </NuxtLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
import HelloWorld from './HelloWorld.vue'
</script>

<style scoped>
pre {
  background-color: var(--color-bg);
  padding: 1rem;
  max-width: 480px;
  overflow-x: auto;
}

.search {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-bottom: 2rem;
}

nav {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 12px;
  margin-bottom: 2rem;
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
  .search {
    margin-top: -2rem;
    margin-right: 1rem;
  }

  nav {
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
