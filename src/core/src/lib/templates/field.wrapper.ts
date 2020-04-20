import { ViewChild, ViewContainerRef } from '@angular/core';

import { FormlyFieldConfig } from '../components/formly.field.config';
import { FieldType } from './field.type';

export abstract class FieldWrapper<F extends FormlyFieldConfig = FormlyFieldConfig> extends FieldType<F> {
  // TODO: remove `any`, once dropping angular `V7` support.
  @ViewChild('fieldComponent', <any>{ read: ViewContainerRef, static: false }) fieldComponent: ViewContainerRef;
}
