<template>
  <div class="item">
    <i aria-hidden="true">
      <slot name="icon" />
    </i>
    <div class="details">
      <article>
        <h3 v-if="$slots.heading">
          <slot name="heading" />
        </h3>
        <div v-if="$slots.task" class="task">
          <slot name="task" />
        </div>
        <div v-if="$slots.hint" class="hint">
          <slot name="hint" />
        </div>
        <details v-if="$slots.info" class="info">
          <slot name="info" />
        </details>
      </article>
    </div>
  </div>
</template>

<style scoped>
.item {
  margin-top: 2rem;
  display: flex;
  position: relative;
}

.details {
  flex: 1;
  margin-left: -1.5rem;
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  width: 32px;
  height: 32px;
  color: var(--color-text);
}

h3 {
  font-size: 1.25em;
  font-weight: 500;
  margin-left: 32px;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

p {
  margin-bottom: 1em;
}

abbr {
  text-decoration: none;
  border-bottom: 1px dotted var(--color-border);
}

code {
  font-family: var(--font-mono);
}

.hint {
  color: var(--color-heading);
  margin-bottom: 1rem;
}

.info {
  padding: 0 1em;
}

@media (min-width: 1024px) {
  .item {
    margin-top: 0;
    padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  }

  .details {
    margin-left: 0;
  }

  h3 {
    margin-left: 0;
  }

  i {
    top: calc(50% - 25px);
    left: -26px;
    position: absolute;
    border: 1px solid var(--color-border);
    background: var(--color-background);
    border-radius: 8px;
    width: 50px;
    height: 50px;
  }

  .item:before {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:after {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:first-of-type:before {
    display: none;
  }

  .item:last-of-type:after {
    display: none;
  }
}
</style>
