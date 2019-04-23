<template>
  <button
    :type="type"
    :disabled="!!disabled"
  >
    <slot>{{ $t('global.button.default') }}</slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default () {
        return 'button';
      }
    },
    disabled: {
      type: Boolean,
      default () {
        return false;
      }
    }
  }
};
</script>


<style lang="postcss" scoped>
button {
  padding: 0.5em;
  font-size: 1em;
}
</style>

