<template>
  <input-label :label="label">
    <input
      v-model="model"
      :name="name"
      type="text"
    >
  </input-label>
</template>

<script>
import InputLabel from '@/components/atoms/InputLabel';

export default {
  components: {
    InputLabel
  },

  props: {
    label: {
      type: String,
      default () {
        return 'Label';
      }
    },
    name: {
      type: String,
      default () {
        return 'hidden';
      }
    },
    value: {
      type: String,
      default () {
        return '';
      }
    },
    form: {
      type: FormData,
      default () {
        return new FormData();
      }
    }
  },

  data () {
    return {
      model: this.form.get(this.name) || this.value
    };
  },

  watch: {
    'model': {
      handler (model) {
        this.form.set(this.name, model);
      },
      immediate: true
    },
    form: {
      handler () {
        this.model = this.form.get(this.name) || this.model;
      }
    }
  }
};
</script>

<style>
</style>
