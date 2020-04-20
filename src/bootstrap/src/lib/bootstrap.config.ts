import { ConfigOption } from '@ngx-formly/core';
import {
  FormlyFieldInput,
  FormlyFieldCheckbox,
  // FormlyFieldRadio,
  FormlyFieldTextArea,
} from './types/types';
import { FormlyWrapperFormField } from './wrappers/wrappers';

export const FIELD_TYPE_COMPONENTS = [
  // types
  FormlyFieldInput,
  FormlyFieldCheckbox,
  // FormlyFieldRadio,
  FormlyFieldTextArea,

  // wrappers
  FormlyWrapperFormField,
];

export const BOOTSTRAP_FORMLY_CONFIG: ConfigOption = {
  types: [
    {
      name: 'input',
      component: FormlyFieldInput,
      wrappers: ['form-field'],
    },
    {
      name: 'checkbox',
      component: FormlyFieldCheckbox,
      wrappers: ['form-field'],
    },
    // {
    //   name: 'radio',
    //   component: FormlyFieldRadio,
    //   wrappers: ['form-field'],
    // },
    {
      name: 'textarea',
      component: FormlyFieldTextArea,
      wrappers: ['form-field'],
    },
  ],
  wrappers: [
    {name: 'form-field', component: FormlyWrapperFormField },
  ],
};
