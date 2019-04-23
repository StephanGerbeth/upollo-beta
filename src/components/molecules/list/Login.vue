<template>
  <list
    class="login-list"
    :list="list"
  >
    <template v-slot:default="slotProps">
      <atom-button @click.native="$auth.loginWith(slotProps.item.key)">
        {{ slotProps.item.name }}
      </atom-button>
    </template>
  </list>
</template>

<script>
import List from '../List';
import AtomButton from '@/components/atoms/Button';

export default {
  components: {
    AtomButton,
    List
  },

  data () {
    return {
      list: [
        { key: 'google', name: 'Google', color: '#4284f4' },
        { key: 'facebook', name: 'Facebook', color: '#4284f4' }
      ]
    };
  }
};
</script>

<style lang="postcss" scoped>
.login-list {
  padding: 0;
  margin: 0;
  list-style-type: none;
}
</style>
