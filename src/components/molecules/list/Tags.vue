<template>
  <list :list="list">
    <template v-slot:default="slotProps">
      <atom-button
        :disabled="slotProps.item.disabled"
        @click.native="onClick(slotProps.item.key)"
      >
        {{ slotProps.item.key }}
      </atom-button>
    </template>
  </list>
</template>

<script>
import List from '../List';
import AtomButton from '@/components/atoms/Button';
import { getDatabase } from '@/service/firebase';

export default {
  components: {
    AtomButton,
    List
  },

  props: {
    database: {
      type: String,
      default () {
        return null;
      }
    }
  },

  data () {
    return {
      list: [],
      entries: {}
    };
  },

  watch: {
    'database': {
      handler (name) {
        getDatabase(name)
          .observeEntries()
          .subscribe((entries) => {
            this.entries = entries;
          });
      }
    },
    'entries': {
      handler (entries) {
        let list = convertFirebaseEntryToList(entries);
        this.list = list.map((item) => {
          // item.disabled = (item.key !== this.$auth.$state.user.id);
          return item;
        });
      }
    }
  },

  //"(!data.exists() || !newData.exists()) || data.child('owner').val() === auth.uid",
  methods: {
    onClick (e) {
      getDatabase(this.database).deleteEntry(this.entries.child(e));
    }
  }
};

function convertFirebaseEntryToList (entries) {
  let obj = entries.val() || {};
  console.log(obj);
  return Object.keys(obj).map((k) => {
    return {
      key: k,
      data: obj[k]
    };
  });
}
</script>

<style>
</style>
