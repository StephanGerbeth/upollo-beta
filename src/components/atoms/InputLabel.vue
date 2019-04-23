<template>
  <label>
    <span class="label">{{ label }}</span>
    <slot />
  </label>
</template>

<script>

export default {
  props: {
    label: {
      type: String,
      default () {
        return 'Headline';
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
label {
  & > * {
    display: block;
    width: 100%;
    font-size: 1em;
  }

  & > input {
    width: 100%;
    height: 2em;
    padding: 0 1em;
    border: 1px solid black;
    border-radius: 1em;
    outline: none;
    appearance: none;
  }
}
</style>

