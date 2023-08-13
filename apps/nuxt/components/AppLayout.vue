<script setup lang="ts">
import HelloWorld from './HelloWorld.vue'
</script>

<template>
  <div id="app">
    <div class="search">
      <header>
        <HelloWorld msg="Find your Book!" />
      </header>
      <nav>
        <NuxtLink to="/"> Home </NuxtLink>
        <NuxtLink to="/about"> About </NuxtLink>
      </nav>
    </div>
    <main>
      <NuxtPage page-key="static" />
    </main>
  </div>
</template>

<style scoped>
#app {
  max-width: 480px;
  padding: 2rem;
  min-height: 100vh;
}

.search {
  line-height: 1.5;
}

nav {
  display: flex;
  justify-content: center;
  align-items: middle;
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
  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-items: center;
    max-width: 1280px;
  }

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
