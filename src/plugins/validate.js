import { Validator } from 'vee-validate';

export default function ({ app }) {
  app.i18n.locales.forEach((local) => {
    Validator.localize(local.code, require('vee-validate/dist/locale/' + local.code));
  });
  Validator.localize(app.i18n.loadedLanguages[0]);

  app.i18n.beforeLanguageSwitch = (oldLocale, newLocale) => {
    Validator.localize(newLocale);
  };
}
