<template>
  <ul>
    <li
      v-for="item in list"
      :key="item.key"
    >
      <slot :item="item" />
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default () {
        return [];
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
</style>

