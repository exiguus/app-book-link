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
.search {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-bottom: 2rem;
}

header {
  padding-top: 3rem;
  margin-bottom: 1rem;
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

  header {
    margin-bottom: 0;
  }

  nav {
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
