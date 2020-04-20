import { Input } from '@angular/core';

import { FormlyFieldConfig } from '../components/formly.field.config';

export abstract class FieldType<F extends FormlyFieldConfig = FormlyFieldConfig> {
  @Input() field: F;
  defaultOptions?: F;

  get key() { return this.field.key; }

  get formControl() { return this.field.formControl; }

  get to() { return this.field.templateOptions || {}; }

  get showError(): boolean { return this.field.options.showError(this); }

  get id(): string { return this.field.id; }

  get formState() { return this.field.options.formState || {}; }
}
