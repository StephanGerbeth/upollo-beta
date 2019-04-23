<template>
  <input-label :label="label">
    <masked-input
      v-model="model"
      :mask="mask()"
      :name="name"
      :required="!!required"
      :disabled="!!disabled"
      placeholder="max.mustermann@mail.de"
      type="text"
    />
  </input-label>
</template>

<script>
import InputLabel from '@/components/atoms/InputLabel';
import MaskedInput from 'vue-text-mask';
import emailMask from 'text-mask-addons/dist/emailMask';

export default {
  components: {
    InputLabel,
    MaskedInput
  },

  props: {
    required: {
      type: Boolean,
      default () {
        return false;
      }
    },
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
        return 'email';
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
          console.log('enter');
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
  },

  methods: {
    mask () {
      return emailMask;
    }
  }
};
</script>

<style lang="postcss" scoped>
</style>

