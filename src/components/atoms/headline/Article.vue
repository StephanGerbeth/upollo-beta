<template>
  <h2>
    <slot>Article Headline</slot>
  </h2>
</template>

<script>
import Headline from '@/components/atoms/headline/Base';

export default {
  extends: Headline
};
</script>

<style>
</style>
