<template>
  <div class="about">
    <article class="rte">
      <ContentDoc path="/about" />
    </article>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AboutPage'
}
</script>

<style scoped>
@media (min-width: 1024px) {
  .about {
    display: flex;
    align-items: center;
  }
}
</style>
