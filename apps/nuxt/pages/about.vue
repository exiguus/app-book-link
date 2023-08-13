<template>
  <div class="about">
    <article>
      <ContentDoc path="/about" />
    </article>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AboutPage'
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    display: flex;
    align-items: center;
  }
  h1 {
    font-size: 1.25em;
    font-weight: 500;
    margin-bottom: 0.4rem;
    color: var(--color-heading);
  }

  p,
  ul {
    margin-bottom: 1rem;
  }

  ul li {
    margin-bottom: 0.5rem;
    margin-left: 1rem;
  }
}
</style>
