import { PluginIcon } from './components/PluginIcon';
import { PLUGIN_ID } from './pluginId';
import { getTrad } from './utils/getTranslation';

export default {
  register(app: any) {
    app.customFields.register({
      name: PLUGIN_ID,
      pluginId: PLUGIN_ID,
      type: 'json',
      icon: PluginIcon,
      intlLabel: {
        id: getTrad(`${PLUGIN_ID}.label`),
        defaultMessage: 'String Array',
      },
      intlDescription: {
        id: getTrad(`${PLUGIN_ID}.description`),
        defaultMessage: 'Enter multiple string values',
      },
      components: {
        Input: async () =>
          import('./components/StringArrayField').then((module) => ({
            default: module.StringArrayField,
          })),
      },
      options: {
        advanced: [
          {
            sectionTitle: {
              id: 'global.settings',
              defaultMessage: 'Settings',
            },
            items: [
              {
                name: 'required',
                type: 'checkbox',
                intlLabel: {
                  id: getTrad(`${PLUGIN_ID}.options.advanced.requiredField`),
                  defaultMessage: 'Required field',
                },
                description: {
                  id: getTrad(`${PLUGIN_ID}.options.advanced.requiredFieldDescription`),
                  defaultMessage: "You won't be able to create an entry if this field is empty",
                },
              },
            ],
          },
        ],
      },
    });
  },

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);
          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
