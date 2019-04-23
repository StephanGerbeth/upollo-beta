<template>
  <input-label
    class="switch"
    :label="label"
  >
    <input
      v-model="model"
      type="checkbox"
      :disabled="!!disabled"
    >
    <span class="input">
      <span class="wrapper">
        <span class="handle" />
      </span>
    </span>
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
    disabled: {
      type: Boolean,
      default () {
        return false;
      }
    },
    name: {
      type: String,
      default () {
        return 'switch';
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
      model: this.form.get(this.name) || this.value || false
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
.switch {
  & .input {
    position: relative;
    display: block;
    width: 100%;
    height: 2em;
    overflow: hidden;
    border: 1px solid black;
    border-radius: 1em;

    & .wrapper {
      position: absolute;
      top: -1px;
      left: 0;
      width: 100%;
      height: 100%;
      transition-duration: 250ms;
      transition-property: transform;
      transform: translateX(0);
      will-change: transform;
    }

    & .handle {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 2em;
      height: 2em;
      background-color: red;
      border: 1px solid black;
      border-radius: 50%;
      transition-duration: 250ms;
      transition-property: transform;
      transform: translateX(-1px);
      will-change: transform;
    }
  }

  & input {
    display: none;

    &:checked + .input > .wrapper {
      transform: translateX(100%);

      & > .handle {
        transform: translateX(calc(-100% + 1px));
      }
    }
  }
}
</style>
