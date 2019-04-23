<template>
  <molecule-section headline="add skyline">
    <atom-text>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    </atom-text>
    <molecule-form
      :db-key="dbKey.flight"
      :database="database.flight"
      @key-change="onKeyChange"
      @protected="onProtected"
    >
      <template v-slot:form-data="{formData}">
        <input-email
          :label="$t('global.labels.email')"
          :form="formData"
          :disabled="disabled"
          name="email"
        />
        <input-number
          :label="$t('global.labels.altitude')"
          :form="formData"
          :disabled="disabled"
          name="altitude"
        />
        <input-number
          :label="$t('global.labels.freefall')"
          :form="formData"
          name="freefall"
        />
        <input-switch
          :label="$t('global.labels.reserve')"
          :form="formData"
          :disabled="disabled"
          name="reserve"
        />
        <input-textarea
          :label="$t('global.labels.comment')"
          :form="formData"
          :disabled="disabled"
          name="comment"
        />
      </template>
    </molecule-form>
    <molecule-form
      :db-key="dbKey.participants"
      :database="database.participants"
    >
      <template v-slot:form-data="{formData}">
        <molecule-list-tags :database="database.participants" />
        <input-hidden
          :label="$t('global.labels.friends')"
          :form="formData"
          :value="$auth.$state.user.id"
          name="uid"
        />
      </template>
    </molecule-form>
    <qr-code :url="url" />
  </molecule-section>
</template>

<script>
import MoleculeSection from '@/components/molecules/Section';
import AtomText from '@/components/atoms/Text';
import MoleculeForm from '@/components/molecules/Form';
import InputEmail from '@/components/atoms/input/Email';
import InputNumber from '@/components/atoms/input/Number';
import InputSwitch from '@/components/atoms/input/Switch';
import InputTextarea from '@/components/atoms/input/Textarea';
import InputHidden from '@/components/atoms/input/Hidden';
import MoleculeListTags from '@/components/molecules/list/Tags';
import QrCode from '@/components/atoms/QrCode';

export default {
  components: {
    MoleculeSection,
    AtomText,
    MoleculeForm,
    InputEmail,
    InputNumber,
    InputSwitch,
    InputTextarea,
    InputHidden,
    MoleculeListTags,
    QrCode
  },

  data () {
    return {
      url: null,
      disabled: false,
      database: {
        flight: 'flights',
        participants: '/'
      },
      dbKey: {
        flight: this.$route.query.key,
        participants: this.$auth.$state.user.id
      }
    };
  },

  mounted () {
    this.generateQrCodeUrl(this.dbKey);
  },

  methods: {
    onKeyChange (key) {
      this.generateQrCodeUrl(key);
      this.database.participants = `${this.database.flight}/${key}/participants`;
    },

    onProtected (value) {
      console.log('onProtected', value);
      this.disabled = value;
    },

    generateQrCodeUrl (key) {
      if (key && key !== '') {
        this.url = `${global.location.origin}${global.location.pathname}?key=${key}`;
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
</style>
