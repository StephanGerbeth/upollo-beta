<i18n>
{
  "de": {
    "text": "Ich bin die Startseite12"
  },
  "en": {
    "text": "I'm the homepage"
  }
}
</i18n>

<template>
  <div class="content">
    <login-list />
  </div>
</template>

<script>
import LoginList from '@/components/molecules/list/Login';

export default {
  components: {
    LoginList
  },

  head () {
    return {
      title: 'title of page'
    };
  },

  data () {
    return {

    };
  }
};
</script>
