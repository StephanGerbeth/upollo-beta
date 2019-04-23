<i18n>
{
  "en": {

  },
  "de": {

  }
}
</i18n>

<template>
  <div>
    <form-skydive />
  </div>
</template>

<script>
import FormSkydive from '@/components/organisms/form/Skydive';

export default {
  nuxtI18n: {
    paths: {
      en: '/add/skydive',
      de: '/add/skydive'
    }
  },

  middleware: 'auth',

  components: {
    FormSkydive
  },

  head () {
    return {
      title: 'title of page'
    };
  },

  data () {
    return {

    };
  },

  mounted () {

  },

  methods: {

  }
};
</script>

<style lang="postcss">
</style>

