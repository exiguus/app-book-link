<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <div class="header">
      <img class="logo" alt="book_link logo" src="@/assets/logo.svg" />
      <h1 class="green">
        {{ msg }}
      </h1>
      <h3>Use <strong class="green">book_link</strong> to share it</h3>
    </div>
    <form>
      <fieldset>
        <legend class="sr-only">Search Book</legend>
        <p>
          <label for="search">
            <span class="sr-only"
              >Search Book by <abbr title="International Standard Book Number">ISBN</abbr> or
              Title</span
            >
            <input
              id="search"
              name="search"
              type="search"
              defaultValue="78-0-345-39180-3"
              placeholder="ISBN, Title"
            />
          </label>
        </p>
        <p>
          <button type="submit">Search</button>
        </p>
      </fieldset>
      <p>Hint: You can use your Mobile Camera to scan and paste the code.</p>
    </form>
  </div>
</template>

<style scoped>
.logo {
  display: block;
  width: 64px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
  margin-bottom: 1em;
}

.header,
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
}

fieldset {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: none;
  margin-bottom: 1rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
  form {
    padding-right: 0;
    padding-left: 2rem;
  }
}
</style>
