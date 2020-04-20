import {
  Component,
  Input,
  OnChanges,
  Optional,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

import { FormlyConfig } from '../services/formly.config';
import { FormlyFieldConfig, FormlyFormOptions } from './formly.field.config';

@Component({
  selector: 'formly-form',
  template: `
    <formly-field
      *ngFor='let field of fields'
      [field]='field'
      [formControl]='form.get(field.key)'
    >
    </formly-field>
  `,
})
export class FormlyForm implements OnChanges {
  @Input() form: FormGroup;
  @Input() model: any = {};
  @Input() fields: FormlyFieldConfig[] = [];
  @Input() options: FormlyFormOptions = {};

  constructor(
    private formlyConfig: FormlyConfig,
    @Optional() private parentFormGroup: FormGroupDirective
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.fields) {
      this.setOptions();
    }
  }

  setOptions() {
    if (!this.options) {
      this.options = {};
    }
    if (!this.options.formState) {
      this.options.formState = {};
    }
    if (!this.options.showError) {
      this.options.showError = this.formlyConfig.extras.showError;
    }

    // if (!this.options.parentForm && this.parentFormGroup) {
    //   defineHiddenProp(this.options, 'parentForm', this.parentFormGroup);
    // }

    this.fields.forEach((field) => (field.options = this.options));
  }
}
