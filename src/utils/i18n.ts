import i18n from 'i18n';
import path from 'path';

i18n.configure({
  locales: ['en', 'ar'],
  directory: path.join(__dirname, '../locales'),
  defaultLocale: 'en',
  header: 'accept-language',
  objectNotation: true,
  autoReload: true,
  updateFiles: false,
});

export default i18n;