<template>
  <h1>
    <slot>Page Headline</slot>
  </h1>
</template>

<script>
import Headline from '@/components/atoms/headline/Base';

export default {
  extends: Headline
};
</script>

<style>
</style>
