import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';

import { ExampleViewerComponent } from './example-viewer/example-viewer.component';
import { ExamplesRouterViewerComponent } from './examples-router-viewer/examples-router-viewer.component';
import { CopierService } from './copier/copier.service';

@NgModule({
  imports: [
    CommonModule,
    FormlyModule,
  ],
  exports: [
    CommonModule,

    ExamplesRouterViewerComponent,
  ],
  declarations: [
    ExampleViewerComponent,
    ExamplesRouterViewerComponent,
  ],
  providers: [
    CopierService,
  ],
})
export class SharedModule { }
