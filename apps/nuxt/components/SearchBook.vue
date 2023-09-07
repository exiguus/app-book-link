<template>
  <SearchBookProvider
    v-slot="{ bookResults, submit, clear, share, copy, copyImage, infoText, pending, error, data }"
  >
    <client-only>
      <SearchForm :submit="submit" />
    </client-only>
    <SearchResults
      v-if="bookResults"
      :pending="pending"
      :error="error"
      :data="data"
      :info-text="infoText"
      :share="share"
      :clear="clear"
      :copy="copy"
      :copy-image="copyImage"
    />
  </SearchBookProvider>
</template>
