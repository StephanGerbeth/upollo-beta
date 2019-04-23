<template>
  <form @submit="onSubmit">
    <slot
      name="form-data"
      :form-data="formData"
    />
    <atom-button type="submit" />
  </form>
</template>

<script>
import 'formdata-polyfill';
import AtomButton from '@/components/atoms/Button';
import { getDatabase } from '@/service/firebase';
import { convertObjectToFormData, covertFormDataToObject } from '@/utils/formData';

export default {
  components: {
    AtomButton
  },

  props: {
    dbKey: {
      type: String,
      default () {
        return null;
      }
    },
    database: {
      type: String,
      default () {
        return null;
      }
    }
  },

  data () {
    return {
      formData: new FormData(),
      dbEntry: null
    };
  },

  watch: {
    'database': {
      handler () {
        this.update();
      }
    },
    'dbKey': {
      handler () {
        this.update();
      }
    },
    'dbEntry': {
      handler (entry) {
        getDatabase(this.database).observeEntry(entry).subscribe((entry) => {
          let formData = convertObjectToFormData(entry.val() || covertFormDataToObject(this.formData));
          formData.delete('participants');
          this.formData = formData;
          this.$emit('protected', this.formData.has('owner') && this.formData.get('owner') !== this.$auth.$state.user.id);
        });
        this.$emit('key-change', entry.key);
      }
    }
  },

  mounted () {
    this.update();
    // getDatabase('flights')
    //   .getEntriesByOwner()
    //   .then((result) => {
    //     result.forEach((entry) => {
    //       console.log(covertFormDataToObject(entry));

    //     });
    //   });
  },

  methods: {
    onSubmit (e) {
      e.preventDefault();
      if (this.formData.get('owner')) {
        this.formData.delete('owner');
      }

      getDatabase(this.database)
        .updateEntry(this.dbEntry, this.formData, this.dbKey)
        .then((key) => {
          this.$emit('key-change', key);
        });
    },

    update () {
      getDatabase(this.database)
        .getEntry(this.dbKey)
        .then((entry) => {
          this.dbEntry = entry;
        });
    }
  }
};
</script>

<style lang="postcss" scoped>
</style>
