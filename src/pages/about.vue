<i18n src="@/locales/about.lang">
{
  "en": {
    "test": "message 123456789",
    "hello": "hello world!"
  },
  "de": {
    "test": "nachricht 122",
    "hello": "hallo welt"
  }
}
</i18n>

<template>
  <div>
    <qr-code url="http://www.spiegel.de" />
    <headline :content="$t('test')" />
    hello22 {{ $t('configxyz') }}
    {{ $t('hello') }}
    <img
      src="~/assets/image.svg"
      alt="test"
    >
    <img
      src="~/assets/image2.svg"
      alt="test"
    >
    <img
      src="~/assets/image0.png"
      alt="test"
    >

    <intersect
      @enter="enter"
      @leave="leave"
      @passing="passing"
    >
      <img
        src="~/assets/image2.png"
        alt="test"
      >
    </intersect>
    <img
      src="~/assets/image0.png"
      alt="test"
    >
    <img
      src="~/assets/image1.png"
      alt="test"
    >
    <img
      src="~/assets/image0.png"
      alt="test"
    >
    <img
      src="~/assets/sample/1920x300.jpg"
      alt="test"
    >
  </div>
</template>

<script>
import Headline from '~/components/atoms/Headline';
import QrCode from '@/components/atoms/QrCode';
// import { getDatabase } from '@/service/firebase';

export default {
  nuxtI18n: {
    paths: {
      en: '/about',
      de: '/ueber'
    }
  },

  middleware: 'auth',

  components: {
    Headline,
    QrCode
  },

  head () {
    return {
      title: 'title of page'
    };
  },

  data () {
    return {
      msg: 'I will change'
    };
  },

  mounted () {
    console.log('BOOM');


    // getDatabase('airports').then((result) => {
    //   console.log(result);
    // });

  },

  methods: {
    passing (value) {
      console.log('AHA', value.intersection.y, value.intersectionRatio);
    },

    enter () {
      console.log('enter');
    },

    leave () {
      console.log('leave');
    }
  }
};
</script>

<style lang="postcss">
img {
  display: block;
  width: 100%;
}
</style>

