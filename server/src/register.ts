// import type { Core } from '@strapi/strapi';

interface Strapi {
  customFields: {
    register: (field: any) => void;
  };
}

export interface RegisterArguments {
  strapi: Strapi;
}

export default ({ strapi }: RegisterArguments) => {
  strapi.customFields.register({
    name: 'string-array',
    plugin: 'string-array-field',
    type: 'json',
    inputSize: {
      default: 6,
      isResizable: true,
    },
  });
};
