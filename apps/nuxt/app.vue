<template>
  <div>
    <Head>
      <Title>book_link: Share your Book</Title>
      <Meta
        name="description"
        content="Past your ISBN, get the Book title and author, copy & share it."
      />
      <Meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta name="theme-color" content="#ffffff" />
      <Meta name="date" :content="date" />
      <Meta property="og:type" content="website" />
      <Meta property="og:title" content="book_link: Share your Book" />
      <Meta
        property="og:description"
        content="Past your ISBN, get the Book title and author, copy & share it."
      />
      <Meta property="og:image" content="https://book-link.vercel.app/book_link.png" />
      <Meta property="og:url" content="https://book-link.vercel.app/" />
      <Meta property="og:site_name" content="book_link" />
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon-180x180.png" />
    </Head>
    <VitePwaManifest />
    <div class="page">
      <PageHeader />
      <NuxtLoadingIndicator />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
    <PageFooter />
  </div>
</template>

<script setup lang="ts">
import '@/assets/main.css'

const date = useAppConfig().buildDate
</script>

<script lang="ts">
useHead({
  htmlAttrs: {
    lang: 'en'
  }
})
</script>

<style>
.page {
  padding: 1rem 2rem;
  margin: 0 auto;
  max-width: 480px;
  min-height: 100vh;
  font-weight: normal;
}

@media (min-width: 1024px) {
  .page {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-items: center;
    max-width: 1280px;
  }
}
</style>
