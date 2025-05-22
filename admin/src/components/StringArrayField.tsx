import * as React from 'react';
import {
  Button,
  Field,
  Flex,
  Box,
} from '@strapi/design-system';
import { Trash } from '@strapi/icons';
import { type InputProps, useField } from '@strapi/strapi/admin';

type StringArrayFieldProps = InputProps & {
  labelAction?: React.ReactNode;
};

export const StringArrayField = React.forwardRef<HTMLDivElement, StringArrayFieldProps>(
  ({ hint, disabled, labelAction, label, name, required, ...props }, ref) => {
    const field = useField(name);
    let currentValue = Array.isArray(field.value) ? field.value : [];
    const [fields, setFields] = React.useState<string[]>(currentValue);
    const [newField, setNewField] = React.useState<string>('');

    const addField = () => {
      if (newField.trim() !== '') {
        setFields([...fields, newField.trim()]);
        setNewField('');
      }
    };

    const removeField = (index: number) => {
      const updatedFields = fields.filter((_, i) => i !== index);
      setFields(updatedFields);
    };

    const handleFieldChange = (index: number, updatedValue: string) => {
      const updatedFields = [...fields];
      updatedFields[index] = updatedValue;
      setFields(updatedFields);
    };

    React.useEffect(() => {
      if (JSON.stringify(fields) !== JSON.stringify(currentValue)) {
        field.onChange({ 
          target: { 
            value: fields,
            name,
          }
        } as React.ChangeEvent<any>);
      }
    }, [fields, field, name]);

    return (
      <Field.Root name={name} id={name} error={field.error} hint={hint} required={required}>
        <Field.Label action={labelAction}>{label}</Field.Label>
        <Field.Hint />
        {fields.map((field, index) => (
          <Flex key={index} paddingTop={1} paddingBottom={2} justifyContent="space-between">
            <Box style={{ marginRight: '8px', flexGrow: 1 }}>
              <Field.Input
                type="text"
                size="S"
                value={field}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange(index, e.target.value)}
              />
            </Box>
            <Button variant="danger-light" onClick={() => removeField(index)}>
              <Trash />
            </Button>
          </Flex>
        ))}
        <Flex paddingTop={1} paddingBottom={2} justifyContent="space-between">
          <Box style={{ marginRight: '8px', flexGrow: 1 }}>
            <Field.Input
              type="text"
              size="S"
              placeholder="New Field"
              value={newField}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewField(e.target.value)}
            />
          </Box>
          <Button variant="secondary" disabled={!newField} onClick={addField}>
            Add Field
          </Button>
        </Flex>
        <Field.Hint />
        <Field.Error />
      </Field.Root>
    );
  }
);