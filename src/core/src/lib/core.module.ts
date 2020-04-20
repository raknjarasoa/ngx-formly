import { CommonModule } from '@angular/common';
import { ANALYZE_FOR_ENTRY_COMPONENTS, Inject, ModuleWithProviders, NgModule, Optional } from '@angular/core';

import { FormlyAttributes } from './components/formly.attributes';
import { FormlyField } from './components/formly.field';
import { FormlyForm } from './components/formly.form';

import { ConfigOption, FormlyConfig, FORMLY_CONFIG } from './services/formly.config'; 

import { FormlyTemplateType } from './templates/field-template.type';
import { FormlyGroup } from './templates/formly.group';
import { FormlyValidationMessage } from './templates/formly.validation-message';


export function defaultFormlyConfig(formlyConfig: FormlyConfig): ConfigOption {
  return {
    types: [
      { name: 'formly-group', component: FormlyGroup },
      { name: 'formly-template', component: FormlyTemplateType },
    ],
  };
}

@NgModule({
  declarations: [
    FormlyForm,
    FormlyField,
    FormlyAttributes,
    FormlyGroup,
    FormlyValidationMessage,
    FormlyTemplateType,
  ],
  entryComponents: [FormlyGroup, FormlyTemplateType],
  exports: [FormlyForm, FormlyField, FormlyAttributes, FormlyGroup, FormlyValidationMessage],
  imports: [CommonModule],
})
export class FormlyModule {
  static forRoot(config: ConfigOption = {}): ModuleWithProviders<FormlyModule> {
    return {
      ngModule: FormlyModule,
      providers: [
        { provide: FORMLY_CONFIG, multi: true, useFactory: defaultFormlyConfig, deps: [FormlyConfig] },
        { provide: FORMLY_CONFIG, useValue: config, multi: true },
        { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: config, multi: true },
        FormlyConfig, 
      ],
    };
  }

  static forChild(config: ConfigOption = {}): ModuleWithProviders<FormlyModule> {
    return {
      ngModule: FormlyModule,
      providers: [
        { provide: FORMLY_CONFIG, useValue: config, multi: true },
        { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: config, multi: true }, 
      ],
    };
  }

  constructor(
    configService: FormlyConfig,
    @Optional() @Inject(FORMLY_CONFIG) configs: ConfigOption[] = [],
  ) {
    if (!configs) {
      return;
    }

    configs.forEach(config => configService.addConfig(config));
  }
}
