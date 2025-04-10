import * as React from 'react';
import {
  Button,
  Field,
  Flex,
} from '@strapi/design-system';
import { Plus, Trash } from '@strapi/icons';import { IconButton } from '@strapi/design-system';
import { Box } from '@strapi/design-system';
;

interface StringArrayFieldProps {
  name: string;
  onChange: (e: { target: { name: string; value: string[] } }) => void;
  value: string[] | null;
  attribute: Record<string, any>;
  label: string;
  labelAction?: React.ReactNode;
  required?: boolean;
  description?: {
    id: string;
    defaultMessage: string;
  };
  placeholder?: string;
  disabled?: boolean;
  hint?: string;
  error?: string;
}

export const StringArrayField = React.forwardRef<HTMLButtonElement, StringArrayFieldProps>(({
  hint,
  disabled = false,
  labelAction,
  label,
  name,
  required = false,
  description,
  onChange,
  value,
  error,
  placeholder,
  attribute,
}, forwardedRef) => {
  console.log('StringArrayField', name);
  const currentValue = Array.isArray(value) ? value : [];

  const handleAddItem = (): void => {
    const newValue = [...currentValue, ''];
    onChange({ target: { name, value: newValue } });
  };

  // Manejar el cambio de un elemento existente
  const handleItemChange = (index: number, newValue: string): void => {
    const updatedValues = [...currentValue];
    updatedValues[index] = newValue;
    onChange({ target: { name, value: updatedValues } });
  };

  const handleRemoveItem = (index: number): void => {
    const newValue = [...currentValue];
    newValue.splice(index, 1);
    onChange({ target: { name, value: newValue } });
  };

  return (
      <Field.Root
        name={name} 
        id={name}
        type="text"
        label={label}
        placeholder={placeholder}
        description={hint}
        error={error}
        hint={description ? description.defaultMessage : undefined}
        required={required}>
        <Flex direction="column" gap={2} alignItems="stretch">
          <Field.Label action={labelAction}>{label}</Field.Label>
          <Flex direction="column" gap={2} alignItems="stretch">
            {currentValue.map((item, index) => (
              <Flex 
                direction="row"
                gap={2}
                justifyContent="space-between"
                key={`${name}-${index}`}>
                <Box style={{ flexGrow: 1 }}>
                  <Field.Input
                    aria-label={`${name}-${index}`}
                    name={`${name}-${index}`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleItemChange(index, e.target.value)}
                    value={item}
                    fullWidth
                  />
                </Box>
                <IconButton
                  variant="danger-light"
                  onClick={() => handleRemoveItem(index)}
                  aria-label={`remove-${name}-${index}`}
                  size="L">
                  <Trash />
                </IconButton>
              </Flex>
            ))}
            <Button
              startIcon={<Plus />}
              variant="secondary"
              onClick={handleAddItem}
              disabled={disabled}>
              Añadir String
            </Button>
          </Flex>
          {error && <Field.Error>{error}</Field.Error>}
          {description && <Field.Hint>{description.defaultMessage}</Field.Hint>}
        </Flex>
      </Field.Root>
  );
});
