<template>
  <figure>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :viewBox="viewbox"
    >
      <path :d="svg.path" />
    </svg>
    <figcaption>
      <a :href="shortUrl">
        {{ shortUrl }}
      </a>
    </figcaption>
  </figure>
</template>

<script>

export default {
  props: {
    url: {
      type: String,
      default () {
        return null;
      }
    }
  },

  data () {
    return {
      svg: {
        size: 1,
        path: ''
      },
      shortUrl: ''
    };
  },

  computed: {
    viewbox () {
      return `0 0 ${this.svg.size} ${this.svg.size}`;
    }
  },

  watch: {
    url: {
      handler (value) {
        if (value) {
          this.update();
        }
      },
      immediate: true
    }
  },

  methods: {
    update () {
      this.$axios.$get('/api/url-shortener', {
        params: {
          url: this.url
        },
      }).then((result) => {
        this.svg = result.data.svg;
        this.shortUrl = result.data.shortUrl;
      });
    }
  }
};
</script>

<style lang="postcss" scoped>
</style>
