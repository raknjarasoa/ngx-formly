import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-checkbox',
  template: `
    <div [ngClass]="{
      'form-check': toto.formCheck.indexOf('custom') === -1,
      'form-check-inline': toto.formCheck === 'inline',
      'custom-control custom-checkbox': toto.formCheck.indexOf('custom') === 0,
      'custom-control-inline': toto.formCheck === 'custom-inline'
    }">
      <input type="checkbox"
        [class.is-invalid]="showError"
        [class.form-check-input]="toto.formCheck.indexOf('custom') === -1"
        [class.custom-control-input]="toto.formCheck.indexOf('custom') === 0"
        [indeterminate]="toto.indeterminate && formControl.value === null"
        [formControl]="formControl"
        [formlyAttributes]="field">
      <label [for]="id"
        [class.form-check-label]="toto.formCheck.indexOf('custom') === -1"
        [class.custom-control-label]="toto.formCheck.indexOf('custom') === 0"
      >
        {{ toto.label }}
        <span *ngIf="toto.required && toto.hideRequiredMarker !== true">*</span>
      </label>
    </div>
  `,
})
export class FormlyFieldCheckbox extends FieldType {
  defaultOptions = {
    templateOptions: {
      indeterminate: true,
      hideLabel: true,
      formCheck: 'custom', // 'custom' | 'stacked' | 'inline' | 'custom-inline'
    },
  };

  get toto(): any {
    return this.defaultOptions.templateOptions;
  }
}
