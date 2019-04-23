<template>
  <section>
    <section-headline>{{ headline }}</section-headline>
    <slot />
  </section>
</template>

<script>
import SectionHeadline from '@/components/atoms/headline/Section';

export default {
  components: {
    SectionHeadline
  },

  props: {
    headline: {
      type: String,
      default () {
        return 'Section Headline';
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
</style>

