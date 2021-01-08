import { ConnectorProperty } from '@debezium/ui-models';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { FormCheckboxComponent } from './FormCheckboxComponent';
import { FormDurationComponent } from './FormDurationComponent';
import { FormInputComponent } from './FormInputComponent';
import { FormMaskHashSaltComponent } from './FormMaskHashSaltComponent';
import { FormMaskOrTruncateComponent } from './FormMaskOrTruncateComponent';
import { FormSelectComponent } from './FormSelectComponent';
import { FormSwitchComponent } from './FormSwitchComponent';

export interface IFormComponentProps {
  propertyDefinition: ConnectorProperty;
  helperTextInvalid?: any;
  validated?: "default" | "success" | "warning" | "error" | undefined
  propertyChange: (name: string, selection: any) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

export const FormComponent: React.FunctionComponent<IFormComponentProps> = (
  props
) => {
  const { t } = useTranslation(['app']);

  // Has allowed values - Select component
  if (props.propertyDefinition.allowedValues) {
    return (
      <FormSelectComponent
        fieldId={props.propertyDefinition.name}
        helperTextInvalid={props.helperTextInvalid}
        isRequired={props.propertyDefinition.isMandatory}
        description={props.propertyDefinition.description}
        label={props.propertyDefinition.displayName}
        name={props.propertyDefinition.name}
        propertyChange={props.propertyChange}
        setFieldValue={props.setFieldValue}
        options={props.propertyDefinition.allowedValues}
      />
    );
    // Boolean - checkbox
  } else if (props.propertyDefinition.type === "BOOLEAN") {
    return (
      <FormCheckboxComponent
        isChecked={typeof props.propertyDefinition.defaultValue !== 'undefined' && props.propertyDefinition.defaultValue === true}
        label={props.propertyDefinition.displayName}
        name={props.propertyDefinition.name}
        description={props.propertyDefinition.description}
        propertyChange={props.propertyChange}
        setFieldValue={props.setFieldValue}
      />
    );
    // Boolean - switch
  } else if (props.propertyDefinition.type === "BOOLEAN-SWITCH") {
    return (
      <FormSwitchComponent
        isChecked={typeof props.propertyDefinition.defaultValue !== 'undefined' && props.propertyDefinition.defaultValue === true}
        label={props.propertyDefinition.displayName}
        name={props.propertyDefinition.name}
        description={props.propertyDefinition.description}
        propertyChange={props.propertyChange}
        setFieldValue={props.setFieldValue}
      />
    );
    // Duration
  } else if (props.propertyDefinition.type === "DURATION") {
    return (
      <FormDurationComponent
        description={props.propertyDefinition.description}
        isRequired={props.propertyDefinition.isMandatory}
        fieldId={props.propertyDefinition.name}
        helperTextInvalid={props.helperTextInvalid}
        label={props.propertyDefinition.displayName}
        name={props.propertyDefinition.name}
        propertyChange={props.propertyChange}
        setFieldValue={props.setFieldValue}
      />
    );
     // Column Mask or Column Truncate
  } else if (props.propertyDefinition.type === "COL_MASK_OR_TRUNCATE") {
    return (
      <FormMaskOrTruncateComponent
        description={props.propertyDefinition.description}
        isRequired={props.propertyDefinition.isMandatory}
        fieldId={props.propertyDefinition.name}
        helperTextInvalid={props.helperTextInvalid}
        label={props.propertyDefinition.displayName}
        name={props.propertyDefinition.name}
        i18nAddDefinitionText={t('addDefinition')}
        i18nAddDefinitionTooltip={t('addDefinitionTooltip')}
        i18nRemoveDefinitionTooltip={t('removeDefinitionTooltip')}
        propertyChange={props.propertyChange}
        setFieldValue={props.setFieldValue}
      />
    );
     // Column Mask Hash and Salt
  } else if (props.propertyDefinition.type === "COL_MASK_HASH_SALT") {
    return (
      <FormMaskHashSaltComponent
        description={props.propertyDefinition.description}
        isRequired={props.propertyDefinition.isMandatory}
        fieldId={props.propertyDefinition.name}
        helperTextInvalid={props.helperTextInvalid}
        label={props.propertyDefinition.displayName}
        name={props.propertyDefinition.name}
        propertyChange={props.propertyChange}
        setFieldValue={props.setFieldValue}
      />
    );
        
   // Any other - Text input
  }  else {
    return (
      <FormInputComponent
        isRequired={props.propertyDefinition.isMandatory}
        label={props.propertyDefinition.displayName}
        fieldId={props.propertyDefinition.name}
        name={props.propertyDefinition.name}
        type={props.propertyDefinition.type}
        helperTextInvalid={props.helperTextInvalid}
        infoTitle={
          props.propertyDefinition.displayName || props.propertyDefinition.name
        }
        infoText={props.propertyDefinition.description}
        validated={props.validated}
      />
    );
  }
};
