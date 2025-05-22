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
    name: 'string-array-field',
    plugin: 'string-array-field',
    type: 'json',
    inputSize: {
      default: 6,
      isResizable: true,
    },
  });
};
