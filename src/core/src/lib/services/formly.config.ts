import { Injectable, InjectionToken, ComponentRef } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

import { FormlyFieldConfig, FormlyFieldConfigCache } from '../components/formly.field.config';
import { FieldType } from './../templates/field.type';
import { reverseDeepMerge } from '../utils';

export const FORMLY_CONFIG = new InjectionToken<FormlyConfig>('FORMLY_CONFIG');

/**
 * Maintains list of formly field directive types. This can be used to register new field templates.
 */
@Injectable({ providedIn: 'root' })
export class FormlyConfig {
  types: { [name: string]: TypeOption } = {};
  validators: { [name: string]: ValidatorOption } = {};
  wrappers: { [name: string]: WrapperOption } = {};
  messages: {
    [name: string]: string | ((error: any, field: FormlyFieldConfig) => string);
  } = {};

  extras: ConfigOption['extras'] = {
    showError: function (field: FieldType) {
      return (
        field.formControl &&
        field.formControl.invalid &&
        (field.formControl.touched ||
          !!(field.field.validation && field.field.validation.show))
      );
    },
  };

  addConfig(config: ConfigOption) {
    if (Array.isArray(config.types)) {
      config.types.forEach((type) => this.setType(type));
    }
    if (Array.isArray(config.validators)) {
      config.validators.forEach((validator) => this.setValidator(validator));
    }
    if (Array.isArray(config.wrappers)) {
      config.wrappers.forEach((wrapper) => this.setWrapper(wrapper));
    }
    if (Array.isArray(config.validationMessages)) {
      config.validationMessages.forEach((validation) =>
        this.addValidatorMessage(validation.name, validation.message),
      );
    }
    if (config.extras) {
      this.extras = { ...this.extras, ...config.extras };
    }
  }

  private setType(options: TypeOption | TypeOption[]) {
    if (Array.isArray(options)) {
      options.forEach((option) => this.setType(option));
    } else {
      if (!this.types[options.name]) {
        this.types[options.name] = <TypeOption>{ name: options.name };
      }

      ['component', 'defaultOptions'].forEach((prop) => {
        if (options.hasOwnProperty(prop)) {
          this.types[options.name][prop] = options[prop];
        }
      });

      if (options.wrappers) {
        options.wrappers.forEach((wrapper) =>
          this.setTypeWrapper(options.name, wrapper),
        );
      }
    }
  }

  getType(name: string): TypeOption {
    if (!this.types[name]) {
      throw new Error(
        `[Formly Error] There is no type by the name of '${name}'`,
      );
    }
    return this.types[name];
  }

  private setWrapper(options: WrapperOption) {
    this.wrappers[options.name] = options;
    if (options.types) {
      options.types.forEach((type) => {
        this.setTypeWrapper(type, options.name);
      });
    }
  }

  getWrapper(name: string): WrapperOption {
    if (!this.wrappers[name]) {
      throw new Error(
        `[Formly Error] There is no wrapper by the name of '${name}'`,
      );
    }

    return this.wrappers[name];
  }

  private setTypeWrapper(type: string, name: string) {
    if (!this.types[type]) {
      this.types[type] = <TypeOption>{};
    }
    if (!this.types[type].wrappers) {
      this.types[type].wrappers = [];
    }
    if (this.types[type].wrappers.indexOf(name) === -1) {
      this.types[type].wrappers.push(name);
    }
  }

  private setValidator(options: ValidatorOption) {
    this.validators[options.name] = options;
  }

  private addValidatorMessage(
    name: string,
    message: string | ((error: any, field: FormlyFieldConfig) => string),
  ) {
    this.messages[name] = message;
  }

  getValidatorMessage(name: string) {
    return this.messages[name];
  }


  getMergedField(field: FormlyFieldConfig = {}): any {
    const type = this.getType(field.type);
    if (type.defaultOptions) {
      reverseDeepMerge(field, type.defaultOptions);
    }

 

    // const componentRef = this.resolveFieldTypeRef(field);
    // if (componentRef && componentRef.instance && componentRef.instance.defaultOptions) {
    //   reverseDeepMerge(field, componentRef.instance.defaultOptions);
    // }

    if (!field.wrappers && type.wrappers) {
      field.wrappers = [...type.wrappers];
    }
  }
}
export interface TypeOption {
  name: string;
  component?: any;
  wrappers?: string[];
  defaultOptions?: FormlyFieldConfig;
}

export interface WrapperOption {
  name: string;
  component: any;
  types?: string[];
}

export interface FieldValidatorFn {
  (c: AbstractControl, field: FormlyFieldConfig): ValidationErrors | null;
}

export interface ValidatorOption {
  name: string;
  validation: FieldValidatorFn;
}

export interface ValidationMessageOption {
  name: string;
  message: string | ((error: any, field: FormlyFieldConfig) => string);
}

export interface ConfigOption {
  types?: TypeOption[];
  wrappers?: WrapperOption[];
  validators?: ValidatorOption[];
  validationMessages?: ValidationMessageOption[];

  extras?: {
    showError?: (field: FieldType) => boolean;
  };
}
