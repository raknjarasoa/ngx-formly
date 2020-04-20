import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'formly-app-example',
  template: `
    <form [formGroup]='form' (ngSubmit)='submit()'>
      <formly-form
        [model]='model'
        [fields]='fields'
        [options]='options'
        [form]='form'
      ></formly-form>
      <button type='submit' class='btn btn-primary submit-button'>
        Submit
      </button>
    </form>
  `,
})
export class AppComponent {
  form = new FormGroup({
    text: new FormControl(null),
    nested: new FormGroup({
      story: new FormControl(null),
    }),
    awesome: new FormControl(null),
    whyNot: new FormControl(null),
    custom: new FormControl(null),
  });
  model: any = {};
  options: FormlyFormOptions = {
    formState: {
      awesomeIsForced: false,
    },
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'text',
      type: 'input',
      templateOptions: {
        label: 'Text',
        placeholder: 'Formly is terrific!',
        hidden: interval(1000).pipe(map(v => v % 2 === 0))
      }
    },
    {
      key: 'nested.story',
      type: 'textarea',
      templateOptions: {
        label: 'Some sweet story',
        placeholder:
          'It allows you to build and maintain your forms with the ease of JavaScript :-)',
        description: '',
      },
      expressionProperties: {
        'templateOptions.focus': 'formState.awesomeIsForced',
        'templateOptions.description': (model, formState) => {
          if (formState.awesomeIsForced) {
            return 'And look! This field magically got focus!';
          }
        },
      },
    },
    {
      key: 'awesome',
      type: 'checkbox',
      templateOptions: { label: '' },
      expressionProperties: {
        'templateOptions.disabled': 'formState.awesomeIsForced',
        'templateOptions.label': (model, formState) => {
          if (formState.awesomeIsForced) {
            return 'Too bad, formly is really awesome...';
          } else {
            return 'Is formly totally awesome? (uncheck this and see what happens)';
          }
        },
      },
    },
    {
      key: 'whyNot',
      type: 'textarea',
      expressionProperties: {
        'templateOptions.placeholder': (model, formState) => {
          if (formState.awesomeIsForced) {
            return 'Too bad... It really is awesome! Wasn\'t that cool?';
          } else {
            return 'Type in here... I dare you';
          }
        },
        'templateOptions.disabled': 'formState.awesomeIsForced',
      },
      hideExpression: 'model.awesome',
      templateOptions: {
        label: 'Why Not?',
        placeholder: 'Type in here... I dare you',
      },
    },
    {
      key: 'custom',
      type: 'custom',
      templateOptions: {
        label: 'Custom inlined',
      },
    },
  ];

  submit() {
    if (this.form.valid) {
      alert(JSON.stringify(this.form.getRawValue()));
    }
  }
}
