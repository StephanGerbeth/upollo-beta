<template>
  <input-label :label="label">
    <textarea
      v-model="model"
      :name="name"
      :disabled="!!disabled"
      placeholder="Comment"
    />
  </input-label>
</template>

<script>
import InputLabel from '@/components/atoms/InputLabel';

export default {
  components: {
    InputLabel
  },

  props: {
    disabled: {
      type: Boolean,
      default () {
        return false;
      }
    },
    label: {
      type: String,
      default () {
        return 'Label';
      }
    },
    name: {
      type: String,
      default () {
        return 'textarea';
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
        if (!this.disabled) {
          this.form.set(this.name, model);
        }
      }
    },
    form: {
      handler () {
        this.model = this.form.get(this.name) || this.model;
        if (this.disabled) {
          this.form.delete(this.name);
        }
      }
    },
    disabled: {
      handler () {
        this.form.delete(this.name);
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
textarea {
  height: 5em;
  border-radius: 1em;
}
</style>
>
