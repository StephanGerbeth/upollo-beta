<i18n>
{
  "en": {
    "thousandsSeparatorSymbol": ","
  },
  "de": {
    "thousandsSeparatorSymbol": "."
  }
}
</i18n>

<template>
  <input-label
    :label="label"
    :form="form"
  >
    <masked-input
      v-model="model"
      :mask="mask()"
      :name="name"
      :required="!!required"
      :disabled="!!disabled"
      placeholder="0 m"
      type="text"
    />
  </input-label>
</template>

<script>
import InputLabel from '@/components/atoms/InputLabel';
import MaskedInput from 'vue-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

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
        return 'altitude';
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
          this.form.set(this.name, model.replace(/\D+/g, ''));
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
      return createNumberMask({
        prefix: '',
        suffix: ' m',
        thousandsSeparatorSymbol: this.$t('thousandsSeparatorSymbol')
      });
    }
  }
};
</script>

<style lang="postcss" scoped>
</style>

