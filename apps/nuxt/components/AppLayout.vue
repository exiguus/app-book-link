<template>
  <Head>
    <Title>book_link: Share your Book</Title>
    <Meta
      name="description"
      content="Past your ISBN, get the Book title and author, copy & share it."
    />
    <Meta name="viewport" content="width=device-width, initial-scale=1" />
    <Meta name="theme-color" content="#ffffff" />
    <Meta property="og:type" content="website" />
    <Meta property="og:title" content="book_link: Share your Book" />
    <Meta
      property="og:description"
      content="Past your ISBN, get the Book title and author, copy & share it."
    />
    <Meta property="og:image" content="https://book-link.vercel.app/book_link.png" />
    <Meta property="og:url" content="https://book-link.vercel.app/" />
    <Meta property="og:site_name" content="book_link" />
  </Head>
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

#app {
  max-width: 480px;
  padding: 2rem;
  min-height: 100vh;
}

.search {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
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
