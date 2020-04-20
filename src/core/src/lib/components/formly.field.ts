import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormlyConfig } from '../services/formly.config';
import { FieldWrapper } from '../templates/field.wrapper';
import {
  FormlyFieldConfig,
  FormlyFieldConfigCache,
} from './formly.field.config';
import { wrapProperty } from '../utils';
import { FieldType } from '../templates/field.type';

@Component({
  selector: 'formly-field',
  template: `<ng-template #container></ng-template>`,
})
export class FormlyField implements OnChanges, OnDestroy {
  @Input() field: FormlyFieldConfig;
  @Input() formControl: FormControl;

  // TODO: remove `any`, once dropping angular `V7` support.
  @ViewChild('container', <any>{ read: ViewContainerRef, static: true })
  containerRef: ViewContainerRef;
  private componentRefs: ComponentRef<any>[] = [];

  constructor(
    private formlyConfig: FormlyConfig,
    private renderer: Renderer2,
    private resolver: ComponentFactoryResolver,
    private elementRef: ElementRef
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.initFieldOptions(this.field);
    this.renderField(this.containerRef, this.field, this.field.wrappers);
  }

  private initFieldOptions(field: FormlyFieldConfigCache) {
    if (!field.type && field.fieldGroup) {
      field.type = 'formly-group';
    }

    if (field.type) {
      this.formlyConfig.getMergedField(field);
    }
  }

  private renderField(containerRef: ViewContainerRef, f: FormlyFieldConfigCache, wrappers: string[]) {
    if (this.containerRef === containerRef) {
      this.containerRef.clear();
    }

    if (wrappers && wrappers.length > 0) {
      const [wrapper, ...wps] = wrappers;
      const { component } = this.formlyConfig.getWrapper(wrapper);
      const ref = containerRef.createComponent<FieldWrapper>(this.resolver.resolveComponentFactory(component));
      this.attachComponentRef(ref, f);

      wrapProperty<ViewContainerRef>(ref.instance, 'fieldComponent', ({ firstChange, previousValue, currentValue }) => {
        if (currentValue) {
          const viewRef = previousValue ? previousValue.detach() : null;
          if (viewRef && !viewRef.destroyed) {
            currentValue.insert(viewRef);
          } else {
            this.renderField(currentValue, f, wps);
          }

          !firstChange && ref.changeDetectorRef.detectChanges();
        }
      });
    } else if (f.type) {
      const { component } = this.formlyConfig.getType(f.type);
      const ref = containerRef.createComponent<FieldWrapper>(this.resolver.resolveComponentFactory(component));
      this.field.formControl = this.formControl;
      this.attachComponentRef(ref, f);
    }
  }

  private attachComponentRef<T extends FieldType>(ref: ComponentRef<T>, field: FormlyFieldConfigCache) {
    this.componentRefs.push(ref);
    // field._componentRefs.push(ref);
    Object.assign(ref.instance, { field });
  }

  ngOnDestroy(): void {
    this.componentRefs.forEach(ref => ref.destroy());
  }
}
